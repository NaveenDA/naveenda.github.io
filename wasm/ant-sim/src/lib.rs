use std::f32::consts::PI;
use wasm_bindgen::prelude::*;

const TAU: f32 = PI * 2.0;

const ANT_SPEED: f32 = 45.0; // px/sec
const SENSOR_DIST: f32 = 14.0;
const SENSOR_SPREAD: f32 = 0.55; // radians
const TURN_RATE_HOME: f32 = 3.5; // rad/sec
const TURN_RATE_FORAGE: f32 = 2.5; // rad/sec
const WANDER_STRENGTH: f32 = 3.0; // rad/sqrt(sec) of rotational random-walk noise
const PHEROMONE_DEPOSIT: f32 = 6.0;
const MAX_PHEROMONE: f32 = 200.0;
const PHEROMONE_DECAY: f32 = 0.992; // multiplicative decay per step, calibrated at 60 steps/sec
const PHEROMONE_THRESHOLD: f32 = 0.6;
const FOOD_PICKUP_RADIUS: f32 = 9.0;
const NEST_RADIUS: f32 = 22.0;
const FOOD_SOURCE_COUNT: usize = 4;
const FOOD_UNITS_PER_SOURCE: f32 = 260.0;
const CELL_SIZE: f32 = 6.0;

// Second pheromone channel. Green (the `pher` grid above) is the only
// "ground truth" trail — deposited exclusively by ants carrying food on
// their way home. Purple is not an independently-explored trail; it only
// ever gets laid down by a food-less ant that is *currently standing on a
// green cell*, i.e. a forager that has found a known route to food and is
// blazing it with a directional marker as it walks. Other foragers then
// treat purple as the single highest-priority signal to follow.
//
// This indirection exists because a scalar pheromone field can't encode
// direction on its own: concentration naturally peaks near the nest, since
// that's where every trip starts or ends and trails overlap most. If
// foragers chased green directly, "follow the strongest scent" would
// quietly pull them toward home instead of toward food. Purple sidesteps
// this — the first forager to discover a fresh green trail (with no purple
// on it yet) just heads away from the nest while it's on that trail,
// laying purple as it goes; every forager after that can then follow the
// purple gradient with no directional ambiguity at all.
const SEARCH_DEPOSIT: f32 = 4.0;
const SEARCH_DECAY: f32 = 0.985; // faster than PHEROMONE_DECAY: dries off quicker
const SEARCH_THRESHOLD: f32 = 0.6;
const SEARCH_CONFIRM_BONUS: f32 = 0.5; // extra food-trail strength when a carrier retraces explored ground
const SEARCH_CONFIRM_FADE: f32 = 0.9; // search trail fades faster where it gets "confirmed" into a food trail

const NEST_CLEARANCE: f32 = 110.0; // obstacles/food stay at least this far from the nest
const OBSTACLE_CLUSTER_MIN: u32 = 10;
const OBSTACLE_CLUSTER_MAX: u32 = 15;
const OBSTACLE_CIRCLES_MIN: u32 = 3;
const OBSTACLE_CIRCLES_MAX: u32 = 6;
const OBSTACLE_CLUSTER_SPREAD: f32 = 24.0; // how far circles drift from their cluster center
const OBSTACLE_RADIUS_MIN: f32 = 16.0;
const OBSTACLE_RADIUS_MAX: f32 = 36.0;

/// Small, fast xorshift32 RNG. We don't need cryptographic quality,
/// just cheap decorrelated noise for thousands of ants every frame.
struct Rng(u32);

impl Rng {
    fn next_u32(&mut self) -> u32 {
        let mut x = self.0;
        x ^= x << 13;
        x ^= x >> 17;
        x ^= x << 5;
        self.0 = x;
        x
    }

    fn next_f32(&mut self) -> f32 {
        (self.next_u32() >> 8) as f32 / (1u32 << 24) as f32
    }

    fn range(&mut self, lo: f32, hi: f32) -> f32 {
        lo + self.next_f32() * (hi - lo)
    }
}

fn shortest_angle_diff(from: f32, to: f32) -> f32 {
    let mut diff = (to - from) % TAU;
    if diff > PI {
        diff -= TAU;
    } else if diff < -PI {
        diff += TAU;
    }
    diff
}

fn turn_towards(current: f32, target: f32, max_turn: f32) -> f32 {
    let diff = shortest_angle_diff(current, target).clamp(-max_turn, max_turn);
    current + diff
}

fn cell_index(grid_w: usize, grid_h: usize, cell_size: f32, x: f32, y: f32) -> Option<usize> {
    let gx = (x / cell_size).floor();
    let gy = (y / cell_size).floor();
    if gx < 0.0 || gy < 0.0 {
        return None;
    }
    let (gx, gy) = (gx as usize, gy as usize);
    if gx >= grid_w || gy >= grid_h {
        return None;
    }
    Some(gy * grid_w + gx)
}

fn sample_pheromone(pher: &[f32], grid_w: usize, grid_h: usize, cell_size: f32, x: f32, y: f32) -> f32 {
    match cell_index(grid_w, grid_h, cell_size, x, y) {
        Some(i) => pher[i],
        None => 0.0,
    }
}

fn deposit_pheromone(pher: &mut [f32], grid_w: usize, grid_h: usize, cell_size: f32, x: f32, y: f32, amount: f32) {
    if let Some(i) = cell_index(grid_w, grid_h, cell_size, x, y) {
        pher[i] = (pher[i] + amount).min(MAX_PHEROMONE);
    }
}

#[wasm_bindgen]
pub struct Simulation {
    width: f32,
    height: f32,

    pos_x: Vec<f32>,
    pos_y: Vec<f32>,
    angle: Vec<f32>,
    has_food: Vec<u8>,

    pher: Vec<f32>,
    search_pher: Vec<f32>,
    grid_w: usize,
    grid_h: usize,

    food_x: Vec<f32>,
    food_y: Vec<f32>,
    food_amount: Vec<f32>,

    obstacle_x: Vec<f32>,
    obstacle_y: Vec<f32>,
    obstacle_r: Vec<f32>,

    nest_x: f32,
    nest_y: f32,

    collected: u32,
    rng: Rng,
}

impl Simulation {
    fn grid_dims(width: f32, height: f32) -> (usize, usize) {
        (
            (width / CELL_SIZE).ceil().max(1.0) as usize,
            (height / CELL_SIZE).ceil().max(1.0) as usize,
        )
    }

    fn spawn_food(&mut self, index: usize) {
        // Capped like generate_obstacles()'s cluster placement below — with
        // 30-50 obstacle clusters now possible, an unlucky layout can leave
        // no point that's both clear of every rock and outside the nest's
        // clearance radius. Without a cap this loop spins forever, which
        // hangs the tab (this runs synchronously on the JS thread, on every
        // page load and every Reset click).
        let mut tries = 0;
        loop {
            let x = self.rng.range(20.0, self.width - 20.0);
            let y = self.rng.range(20.0, self.height - 20.0);
            tries += 1;
            let dx = x - self.nest_x;
            let dy = y - self.nest_y;
            let valid = dx * dx + dy * dy > NEST_CLEARANCE * NEST_CLEARANCE
                && !self.point_in_any_obstacle(x, y, FOOD_PICKUP_RADIUS + 12.0);
            if valid || tries > 500 {
                self.food_x[index] = x;
                self.food_y[index] = y;
                self.food_amount[index] = FOOD_UNITS_PER_SOURCE;
                return;
            }
        }
    }

    fn point_in_any_obstacle(&self, x: f32, y: f32, margin: f32) -> bool {
        for i in 0..self.obstacle_x.len() {
            let dx = x - self.obstacle_x[i];
            let dy = y - self.obstacle_y[i];
            let r = self.obstacle_r[i] + margin;
            if dx * dx + dy * dy < r * r {
                return true;
            }
        }
        false
    }

    /// Scatters a handful of rock "clusters" (each a few overlapping circles,
    /// for an irregular blob silhouette instead of perfect circles) around
    /// the arena, keeping clear of the nest. Ants can't pass through them, so
    /// pheromone trails bend around their contours instead of straight lines.
    fn generate_obstacles(&mut self) {
        self.obstacle_x.clear();
        self.obstacle_y.clear();
        self.obstacle_r.clear();

        let cluster_count = self.rng.range(OBSTACLE_CLUSTER_MIN as f32, OBSTACLE_CLUSTER_MAX as f32 + 1.0) as u32;
        for _ in 0..cluster_count {
            let mut tries = 0;
            let (mut cx, mut cy) = loop {
                let x = self.rng.range(50.0, self.width - 50.0);
                let y = self.rng.range(50.0, self.height - 50.0);
                let dx = x - self.nest_x;
                let dy = y - self.nest_y;
                tries += 1;
                if dx * dx + dy * dy > NEST_CLEARANCE * NEST_CLEARANCE || tries > 20 {
                    break (x, y);
                }
            };
            // The tries>20 bailout above can still land inside the clearance
            // zone — push it back out radially instead of silently letting a
            // rock spawn on top of the nest.
            let dx = cx - self.nest_x;
            let dy = cy - self.nest_y;
            let dist2 = dx * dx + dy * dy;
            if dist2 < NEST_CLEARANCE * NEST_CLEARANCE {
                let dist = dist2.sqrt().max(0.001);
                cx = (self.nest_x + dx / dist * (NEST_CLEARANCE + 1.0)).clamp(0.0, self.width);
                cy = (self.nest_y + dy / dist * (NEST_CLEARANCE + 1.0)).clamp(0.0, self.height);
            }

            let circle_count = self.rng.range(OBSTACLE_CIRCLES_MIN as f32, OBSTACLE_CIRCLES_MAX as f32 + 1.0) as u32;
            for _ in 0..circle_count {
                let a = self.rng.range(0.0, TAU);
                let dist = self.rng.range(0.0, OBSTACLE_CLUSTER_SPREAD);
                let ox = (cx + a.cos() * dist).clamp(0.0, self.width);
                let oy = (cy + a.sin() * dist).clamp(0.0, self.height);
                let r = self.rng.range(OBSTACLE_RADIUS_MIN, OBSTACLE_RADIUS_MAX);
                self.obstacle_x.push(ox);
                self.obstacle_y.push(oy);
                self.obstacle_r.push(r);
            }
        }
    }

    fn spawn_ant(&mut self, index: usize) {
        self.pos_x[index] = self.nest_x;
        self.pos_y[index] = self.nest_y;
        self.angle[index] = self.rng.range(0.0, TAU);
        self.has_food[index] = 0;
    }
}

#[wasm_bindgen]
impl Simulation {
    #[wasm_bindgen(constructor)]
    pub fn new(width: f32, height: f32, ant_count: usize, seed: u32) -> Simulation {
        let (grid_w, grid_h) = Simulation::grid_dims(width, height);
        let mut sim = Simulation {
            width,
            height,
            pos_x: vec![0.0; ant_count],
            pos_y: vec![0.0; ant_count],
            angle: vec![0.0; ant_count],
            has_food: vec![0; ant_count],
            pher: vec![0.0; grid_w * grid_h],
            search_pher: vec![0.0; grid_w * grid_h],
            grid_w,
            grid_h,
            food_x: vec![0.0; FOOD_SOURCE_COUNT],
            food_y: vec![0.0; FOOD_SOURCE_COUNT],
            food_amount: vec![0.0; FOOD_SOURCE_COUNT],
            obstacle_x: Vec::new(),
            obstacle_y: Vec::new(),
            obstacle_r: Vec::new(),
            nest_x: width / 2.0,
            nest_y: height / 2.0,
            collected: 0,
            rng: Rng(if seed == 0 { 0x9e3779b9 } else { seed }),
        };
        sim.generate_obstacles();
        for i in 0..FOOD_SOURCE_COUNT {
            sim.spawn_food(i);
        }
        for i in 0..ant_count {
            sim.spawn_ant(i);
        }
        sim
    }

    pub fn step(&mut self, dt: f32) {
        let n = self.pos_x.len();
        let (grid_w, grid_h) = (self.grid_w, self.grid_h);

        for i in 0..n {
            let x = self.pos_x[i];
            let y = self.pos_y[i];
            let ang = self.angle[i];
            let carrying = self.has_food[i] != 0;

            // Wander noise only applies when an ant has no target to commit
            // to (no pheromone found, not carrying food). Earlier this was
            // added unconditionally on top of the pheromone/nest steering,
            // which meant it dwarfed the deliberate turn (wander's per-second
            // variance was much larger than TURN_RATE_FORAGE/HOME could
            // correct for in the same time), so ants could never actually
            // lock onto a trail before noise knocked them back off it.
            let mut new_angle = if carrying {
                // Carriers exclusively sense the green trail — never purple.
                // Concentration naturally peaks near the nest (every trip
                // starts or ends there, so trails overlap most heavily at
                // the hub), which is exactly the direction a carrier wants
                // to go, so "follow the strongest scent" works correctly
                // here. Falling back to a direct bearing when nothing's
                // nearby handles the very first trip along a route (no
                // trail exists yet) and spots where an obstacle detour has
                // temporarily broken the trail.
                let mut best_val = PHEROMONE_THRESHOLD;
                let mut best_ang = ang;
                for &offset in &[-SENSOR_SPREAD, 0.0, SENSOR_SPREAD] {
                    let sa = ang + offset;
                    // Movement wraps toroidally, so sensing must too — an
                    // unwrapped sensor point near an edge would read 0 even
                    // when the toroidally-adjacent cell (just past the edge)
                    // has real trail on it, creating a dead sensing seam
                    // right at the world boundary.
                    let sx = (x + sa.cos() * SENSOR_DIST).rem_euclid(self.width);
                    let sy = (y + sa.sin() * SENSOR_DIST).rem_euclid(self.height);
                    let v = sample_pheromone(&self.pher, grid_w, grid_h, CELL_SIZE, sx, sy);
                    if v > best_val {
                        best_val = v;
                        best_ang = sa;
                    }
                }
                if best_val > PHEROMONE_THRESHOLD {
                    turn_towards(ang, best_ang, TURN_RATE_HOME * dt)
                } else {
                    let target = (self.nest_y - y).atan2(self.nest_x - x);
                    turn_towards(ang, target, TURN_RATE_HOME * dt)
                }
            } else {
                // Foragers: purple, if sensed anywhere nearby, is always
                // the top-priority signal — it means some other forager
                // already blazed a known route to food through here, so
                // climbing its gradient is unambiguous. Only when there's
                // no purple nearby does an ant fall back to checking
                // whether it's directly standing on a green (home-bound)
                // trail with no purple guidance on it yet; if so, it heads
                // away from the nest while riding that stretch of green,
                // which is what lets it become the one blazing the purple
                // for everyone after it (see the deposit step below). With
                // neither signal present, it's just wandering blind.
                let mut best_purple = SEARCH_THRESHOLD;
                let mut best_purple_ang = ang;
                for &offset in &[-SENSOR_SPREAD, 0.0, SENSOR_SPREAD] {
                    let sa = ang + offset;
                    let sx = (x + sa.cos() * SENSOR_DIST).rem_euclid(self.width);
                    let sy = (y + sa.sin() * SENSOR_DIST).rem_euclid(self.height);
                    let v = sample_pheromone(&self.search_pher, grid_w, grid_h, CELL_SIZE, sx, sy);
                    if v > best_purple {
                        best_purple = v;
                        best_purple_ang = sa;
                    }
                }
                // Rotational random walk: the noise must scale with
                // sqrt(dt), not dt, or its accumulated variance over real
                // time depends on the frame rate (tiny turns at 120fps vs.
                // large ones at 30fps), which produces an expanding
                // ballistic ring instead of a diffuse, organic wander.
                let noise = self.rng.range(-1.0, 1.0) * WANDER_STRENGTH * dt.sqrt();
                if best_purple > SEARCH_THRESHOLD {
                    turn_towards(ang, best_purple_ang, TURN_RATE_FORAGE * dt) + noise * 0.4
                } else {
                    let green_here = sample_pheromone(&self.pher, grid_w, grid_h, CELL_SIZE, x, y);
                    if green_here > PHEROMONE_THRESHOLD {
                        // "Away from nest" is only a starting bias, not the
                        // literal heading — a fixed radial bearing ignores
                        // that the trail it's meant to be blazing can curve
                        // (around obstacles, especially now that there are
                        // many more of them), so blindly steering to that
                        // bearing walks the ant off the real trail, into a
                        // rock, and off on a semi-random bounce. Sensing
                        // green in a cone around that bearing instead lets it
                        // follow wherever the trail actually goes.
                        let away_from_nest = (y - self.nest_y).atan2(x - self.nest_x);
                        let mut best_val = 0.0;
                        let mut best_ang = away_from_nest;
                        for &offset in &[-SENSOR_SPREAD, 0.0, SENSOR_SPREAD] {
                            let sa = away_from_nest + offset;
                            let sx = (x + sa.cos() * SENSOR_DIST).rem_euclid(self.width);
                            let sy = (y + sa.sin() * SENSOR_DIST).rem_euclid(self.height);
                            let v = sample_pheromone(&self.pher, grid_w, grid_h, CELL_SIZE, sx, sy);
                            if v > best_val {
                                best_val = v;
                                best_ang = sa;
                            }
                        }
                        turn_towards(ang, best_ang, TURN_RATE_FORAGE * dt) + noise * 0.4
                    } else {
                        ang + noise
                    }
                }
            };

            // Toroidal world: ants that walk off one edge reappear on the
            // opposite edge. A hard bounce or steer-away-from-wall rule
            // sounds simpler, but self-propelled particles with a bounded
            // turn rate settle into a stable circular orbit just inside any
            // such wall instead of actually escaping it. Wrapping removes
            // the wall dynamics entirely, so there's nothing to orbit.
            let mut nx = (x + new_angle.cos() * ANT_SPEED * dt).rem_euclid(self.width);
            let mut ny = (y + new_angle.sin() * ANT_SPEED * dt).rem_euclid(self.height);

            // Obstacles get an elastic bounce (push out along the surface
            // normal, reflect heading across it) rather than a steer-away
            // rule. A steering rule applied continuously near a wall is what
            // caused ants to settle into stable orbits earlier (see the
            // wraparound-world comment below) — an instantaneous reflection
            // doesn't have that failure mode, and it's what naturally bends
            // pheromone trails around a rock's contour instead of through it.
            for oi in 0..self.obstacle_x.len() {
                let dx = nx - self.obstacle_x[oi];
                let dy = ny - self.obstacle_y[oi];
                let r = self.obstacle_r[oi];
                let dist2 = dx * dx + dy * dy;
                if dist2 < r * r {
                    let dist = dist2.sqrt().max(0.001);
                    let (nrm_x, nrm_y) = (dx / dist, dy / dist);
                    nx = self.obstacle_x[oi] + nrm_x * (r + 0.5);
                    ny = self.obstacle_y[oi] + nrm_y * (r + 0.5);
                    let (dir_x, dir_y) = (new_angle.cos(), new_angle.sin());
                    let dot = dir_x * nrm_x + dir_y * nrm_y;
                    new_angle = (dir_y - 2.0 * dot * nrm_y).atan2(dir_x - 2.0 * dot * nrm_x);
                }
            }

            if carrying {
                // If this carrier is retracing ground another ant already
                // explored (search trail present), reinforce the food trail
                // extra hard here and fade the search trail — that's the
                // purple-drying-into-green effect: an explored path becomes
                // a confirmed one once it's actually proven to lead home
                // with food.
                let explored = sample_pheromone(&self.search_pher, grid_w, grid_h, CELL_SIZE, nx, ny);
                let mut deposit_amt = PHEROMONE_DEPOSIT * dt * 60.0;
                if explored > SEARCH_THRESHOLD {
                    deposit_amt += deposit_amt * SEARCH_CONFIRM_BONUS;
                    if let Some(ci) = cell_index(grid_w, grid_h, CELL_SIZE, nx, ny) {
                        self.search_pher[ci] *= SEARCH_CONFIRM_FADE;
                    }
                }
                deposit_pheromone(&mut self.pher, grid_w, grid_h, CELL_SIZE, nx, ny, deposit_amt);

                let dx = nx - self.nest_x;
                let dy = ny - self.nest_y;
                if dx * dx + dy * dy < NEST_RADIUS * NEST_RADIUS {
                    self.has_food[i] = 0;
                    self.collected += 1;
                    new_angle += PI;
                }
            } else {
                // Purple only ever gets laid where the ant is currently
                // standing on a green (home-bound) trail — that's the
                // "blazing" marker described above. Off the green trail,
                // a forager leaves no trace at all, same as a plain
                // random walk.
                //
                // Gated on this step having net increased distance from the
                // nest (not on instantaneous heading — an earlier version
                // gated on heading being within 90 degrees of pure-outward,
                // which sounds equivalent but isn't: right after landing on
                // a green cell, or after an obstacle bounce, the heading is
                // still gradually correcting via turn_towards, and the trail
                // band is only ~1 grid cell wide, so the ant would often
                // wander off it before ever satisfying that heading check —
                // starving deposits almost entirely in some runs (measured:
                // 0-1 food collected in 30s, vs. hundreds without the gate).
                // A plain distance check is far more forgiving of gradual
                // turning and curved detours around obstacles, while still
                // catching the case this exists for: a step that's actually
                // moving back toward the nest.
                let green_here = sample_pheromone(&self.pher, grid_w, grid_h, CELL_SIZE, nx, ny);
                if green_here > PHEROMONE_THRESHOLD {
                    let old_dist2 = (x - self.nest_x).powi(2) + (y - self.nest_y).powi(2);
                    let new_dist2 = (nx - self.nest_x).powi(2) + (ny - self.nest_y).powi(2);
                    if new_dist2 > old_dist2 {
                        deposit_pheromone(&mut self.search_pher, grid_w, grid_h, CELL_SIZE, nx, ny, SEARCH_DEPOSIT * dt * 60.0);
                    }
                }
                for f in 0..self.food_x.len() {
                    if self.food_amount[f] <= 0.0 {
                        continue;
                    }
                    let dx = nx - self.food_x[f];
                    let dy = ny - self.food_y[f];
                    if dx * dx + dy * dy < FOOD_PICKUP_RADIUS * FOOD_PICKUP_RADIUS {
                        self.food_amount[f] -= 1.0;
                        self.has_food[i] = 1;
                        new_angle += PI;
                        if self.food_amount[f] <= 0.0 {
                            self.spawn_food(f);
                        }
                        break;
                    }
                }
            }

            self.pos_x[i] = nx;
            self.pos_y[i] = ny;
            self.angle[i] = new_angle;
        }

        // PHEROMONE_DECAY is calibrated as a per-step factor at 60 steps/sec,
        // so it must be raised to (dt * 60) to give a frame-rate-independent
        // decay rate in real time, same issue as the wander noise above.
        let decay = PHEROMONE_DECAY.powf(dt * 60.0);
        for v in self.pher.iter_mut() {
            if *v > 0.01 {
                *v *= decay;
            } else if *v != 0.0 {
                *v = 0.0;
            }
        }

        let search_decay = SEARCH_DECAY.powf(dt * 60.0);
        for v in self.search_pher.iter_mut() {
            if *v > 0.01 {
                *v *= search_decay;
            } else if *v != 0.0 {
                *v = 0.0;
            }
        }
    }

    pub fn set_ant_count(&mut self, count: usize) {
        let old = self.pos_x.len();
        self.pos_x.resize(count, 0.0);
        self.pos_y.resize(count, 0.0);
        self.angle.resize(count, 0.0);
        self.has_food.resize(count, 0);
        for i in old..count {
            self.spawn_ant(i);
        }
    }

    pub fn reset(&mut self) {
        self.collected = 0;
        for v in self.pher.iter_mut() {
            *v = 0.0;
        }
        for v in self.search_pher.iter_mut() {
            *v = 0.0;
        }
        self.generate_obstacles();
        let n = self.pos_x.len();
        for i in 0..n {
            self.spawn_ant(i);
        }
        for i in 0..self.food_x.len() {
            self.spawn_food(i);
        }
    }

    pub fn ant_count(&self) -> usize {
        self.pos_x.len()
    }

    pub fn pos_x_ptr(&self) -> *const f32 {
        self.pos_x.as_ptr()
    }

    pub fn pos_y_ptr(&self) -> *const f32 {
        self.pos_y.as_ptr()
    }

    pub fn angle_ptr(&self) -> *const f32 {
        self.angle.as_ptr()
    }

    pub fn has_food_ptr(&self) -> *const u8 {
        self.has_food.as_ptr()
    }

    pub fn pher_ptr(&self) -> *const f32 {
        self.pher.as_ptr()
    }

    pub fn search_pher_ptr(&self) -> *const f32 {
        self.search_pher.as_ptr()
    }

    pub fn pher_grid_w(&self) -> usize {
        self.grid_w
    }

    pub fn pher_grid_h(&self) -> usize {
        self.grid_h
    }

    pub fn cell_size(&self) -> f32 {
        CELL_SIZE
    }

    pub fn food_count(&self) -> usize {
        self.food_x.len()
    }

    pub fn food_x_ptr(&self) -> *const f32 {
        self.food_x.as_ptr()
    }

    pub fn food_y_ptr(&self) -> *const f32 {
        self.food_y.as_ptr()
    }

    pub fn food_amount_ptr(&self) -> *const f32 {
        self.food_amount.as_ptr()
    }

    pub fn nest_x(&self) -> f32 {
        self.nest_x
    }

    pub fn nest_y(&self) -> f32 {
        self.nest_y
    }

    pub fn nest_radius(&self) -> f32 {
        NEST_RADIUS
    }

    pub fn collected(&self) -> u32 {
        self.collected
    }

    pub fn obstacle_count(&self) -> usize {
        self.obstacle_x.len()
    }

    pub fn obstacle_x_ptr(&self) -> *const f32 {
        self.obstacle_x.as_ptr()
    }

    pub fn obstacle_y_ptr(&self) -> *const f32 {
        self.obstacle_y.as_ptr()
    }

    pub fn obstacle_r_ptr(&self) -> *const f32 {
        self.obstacle_r.as_ptr()
    }
}

/// Exposes this wasm instance's linear memory so JS can build zero-copy
/// typed-array views over the pointers above instead of serializing
/// per-ant data across the boundary every frame.
#[wasm_bindgen(js_name = getMemory)]
pub fn get_memory() -> JsValue {
    wasm_bindgen::memory()
}
