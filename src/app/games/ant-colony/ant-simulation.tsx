"use client";

import { useEffect, useRef, useState } from "react";
import { loadScriptOnce } from "@/lib/loadScript";

const SIM_WIDTH = 960;
const SIM_HEIGHT = 600;
const WASM_JS_URL = "/wasm/ant-sim/ant_sim.js";
const WASM_BINARY_URL = "/wasm/ant-sim/ant_sim_bg.wasm";
const DEFAULT_ANT_COUNT = 800;
const MIN_ANT_COUNT = 50;
const MAX_ANT_COUNT = 6000;

// ant_sim.js is a classic (non-module) script: it declares `wasm_bindgen`
// as a top-level `let`, which creates a global lexical binding rather than
// a `window` property, so it must be referenced as a bare identifier.
declare const wasm_bindgen: any;

const AntSimulation = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pherCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const searchCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const simRef = useRef<any>(null);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);
  const runningRef = useRef(true);
  const showTrailsRef = useRef(true);
  const antCountRef = useRef(DEFAULT_ANT_COUNT);

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [simVersion, setSimVersion] = useState(0);
  const [dims, setDims] = useState({ width: SIM_WIDTH, height: SIM_HEIGHT });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [antCount, setAntCount] = useState(DEFAULT_ANT_COUNT);
  const [collected, setCollected] = useState(0);
  const [fps, setFps] = useState(0);
  const [running, setRunning] = useState(true);
  const [showTrails, setShowTrails] = useState(true);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    showTrailsRef.current = showTrails;
  }, [showTrails]);

  useEffect(() => {
    antCountRef.current = antCount;
  }, [antCount]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = document.fullscreenElement === containerRef.current;
      setIsFullscreen(active);
      setDims(active ? { width: window.innerWidth, height: window.innerHeight } : { width: SIM_WIDTH, height: SIM_HEIGHT });
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current?.requestFullscreen().catch((err) => console.error("fullscreen request failed", err));
    }
  };

  // Re-creates the wasm Simulation whenever dims changes (entering/exiting
  // fullscreen). A canvas that's just CSS-scaled up to fill a large monitor
  // would blur every 2px ant into a smear, so instead the simulation itself
  // is rebuilt at the new pixel resolution and rendered 1:1.
  useEffect(() => {
    let cancelled = false;
    let createdSim: any = null;

    (async () => {
      try {
        await loadScriptOnce(WASM_JS_URL);
        if (cancelled) return;
        await wasm_bindgen({ module_or_path: WASM_BINARY_URL });
        if (cancelled) return;

        const seed = (Math.floor(Math.random() * 0xffffffff) || 1) >>> 0;
        const sim = new wasm_bindgen.Simulation(dims.width, dims.height, antCountRef.current, seed);
        if (cancelled) {
          sim.free();
          return;
        }
        createdSim = sim;
        simRef.current = sim;
        setStatus("ready");
        setSimVersion((v) => v + 1);
      } catch (err) {
        console.error("ant simulation failed to initialize", err);
        setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      if (createdSim) {
        createdSim.free();
        if (simRef.current === createdSim) simRef.current = null;
      }
    };
  }, [dims.width, dims.height]);

  useEffect(() => {
    if (!simRef.current) return;
    const canvas = canvasRef.current;
    const pherCanvas = pherCanvasRef.current;
    const searchCanvas = searchCanvasRef.current;
    const sim = simRef.current;
    if (!canvas || !pherCanvas || !searchCanvas || !sim) return;

    const ctx = canvas.getContext("2d");
    const pherCtx = pherCanvas.getContext("2d");
    const searchCtx = searchCanvas.getContext("2d");
    if (!ctx || !pherCtx || !searchCtx) return;

    const memory: WebAssembly.Memory = wasm_bindgen.getMemory();
    const gridW = sim.pher_grid_w();
    const gridH = sim.pher_grid_h();
    pherCanvas.width = gridW;
    pherCanvas.height = gridH;
    searchCanvas.width = gridW;
    searchCanvas.height = gridH;
    const pherImage = pherCtx.createImageData(gridW, gridH);
    const searchImage = searchCtx.createImageData(gridW, gridH);

    let frameCount = 0;
    let fpsAccum = 0;
    lastTsRef.current = 0;

    const frame = (ts: number) => {
      if (!lastTsRef.current) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      const dt = Math.min((ts - lastTsRef.current) / 1000, 1 / 20);
      lastTsRef.current = ts;

      if (runningRef.current) {
        sim.step(dt);
      }

      const n = sim.ant_count();
      const posX = new Float32Array(memory.buffer, sim.pos_x_ptr(), n);
      const posY = new Float32Array(memory.buffer, sim.pos_y_ptr(), n);
      const hasFood = new Uint8Array(memory.buffer, sim.has_food_ptr(), n);

      ctx.fillStyle = "#0b0f0a";
      ctx.fillRect(0, 0, dims.width, dims.height);

      const obstacleCount = sim.obstacle_count();
      const obstacleX = new Float32Array(memory.buffer, sim.obstacle_x_ptr(), obstacleCount);
      const obstacleY = new Float32Array(memory.buffer, sim.obstacle_y_ptr(), obstacleCount);
      const obstacleR = new Float32Array(memory.buffer, sim.obstacle_r_ptr(), obstacleCount);
      ctx.fillStyle = "#4a4238";
      for (let i = 0; i < obstacleCount; i++) {
        ctx.beginPath();
        ctx.arc(obstacleX[i], obstacleY[i], obstacleR[i], 0, Math.PI * 2);
        ctx.fill();
      }

      if (showTrailsRef.current) {
        // Search trail (purple) first, food trail (green) drawn on top —
        // so a path that's been "confirmed" by a food-carrying ant reads
        // as green even where it overlaps a fading purple search trail.
        const searchPher = new Float32Array(memory.buffer, sim.search_pher_ptr(), gridW * gridH);
        const searchOut = searchImage.data;
        for (let i = 0; i < searchPher.length; i++) {
          const v = Math.min(1, searchPher[i] / 60);
          const o = i * 4;
          searchOut[o] = 150;
          searchOut[o + 1] = 40;
          searchOut[o + 2] = 210;
          searchOut[o + 3] = Math.floor(v * 160);
        }
        searchCtx.putImageData(searchImage, 0, 0);
        ctx.drawImage(searchCanvas, 0, 0, gridW, gridH, 0, 0, dims.width, dims.height);

        const pher = new Float32Array(memory.buffer, sim.pher_ptr(), gridW * gridH);
        const out = pherImage.data;
        for (let i = 0; i < pher.length; i++) {
          const v = Math.min(1, pher[i] / 60);
          const o = i * 4;
          out[o] = 90;
          out[o + 1] = 20 + Math.floor(180 * v);
          out[o + 2] = 60;
          out[o + 3] = Math.floor(v * 200);
        }
        pherCtx.putImageData(pherImage, 0, 0);
        ctx.drawImage(pherCanvas, 0, 0, gridW, gridH, 0, 0, dims.width, dims.height);
      }

      ctx.fillStyle = "#d9c27e";
      ctx.beginPath();
      ctx.arc(sim.nest_x(), sim.nest_y(), sim.nest_radius(), 0, Math.PI * 2);
      ctx.fill();

      const foodCount = sim.food_count();
      const foodX = new Float32Array(memory.buffer, sim.food_x_ptr(), foodCount);
      const foodY = new Float32Array(memory.buffer, sim.food_y_ptr(), foodCount);
      const foodAmt = new Float32Array(memory.buffer, sim.food_amount_ptr(), foodCount);
      ctx.fillStyle = "#7fd858";
      for (let i = 0; i < foodCount; i++) {
        const r = 4 + Math.min(10, foodAmt[i] / 30);
        ctx.beginPath();
        ctx.arc(foodX[i], foodY[i], r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "#e8e4d8";
      for (let i = 0; i < n; i++) {
        if (hasFood[i]) continue;
        ctx.fillRect(posX[i] - 1, posY[i] - 1, 2, 2);
      }
      ctx.fillStyle = "#ffb454";
      for (let i = 0; i < n; i++) {
        if (!hasFood[i]) continue;
        ctx.fillRect(posX[i] - 1.5, posY[i] - 1.5, 3, 3);
      }

      frameCount++;
      fpsAccum += dt;
      if (fpsAccum >= 0.5) {
        setFps(Math.round(frameCount / fpsAccum));
        setCollected(sim.collected());
        frameCount = 0;
        fpsAccum = 0;
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [simVersion, dims.width, dims.height]);

  const handleAntCountChange = (value: number) => {
    setAntCount(value);
    simRef.current?.set_ant_count(value);
  };

  const handleReset = () => {
    simRef.current?.reset();
    setCollected(0);
  };

  return (
    <div className="min-h-screen bg-ink text-paper px-6 md:px-10 py-24 md:py-28">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
          Rust &middot; WebAssembly &middot; Emergent Behavior
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">
          Ant Colony Simulation
        </h1>
        <p className="text-paper/65 max-w-2xl leading-relaxed mb-10">
          Thousands of ants, each running the same simple rule &mdash; follow
          the strongest scent, or wander &mdash; converge on the shortest
          path between nest and food. The whole colony runs in a Rust core
          compiled to WebAssembly; the browser only reads a raw memory
          buffer to draw each frame, so ant count stops being the
          bottleneck.
        </p>

        <div
          ref={containerRef}
          className={
            isFullscreen
              ? "relative bg-black w-screen h-screen flex items-center justify-center"
              : "relative border border-paper/15 bg-black/30 p-3 md:p-4 mb-6"
          }
        >
          {status === "error" && (
            <div className="aspect-[8/5] flex items-center justify-center text-sm text-paper/60">
              Couldn&rsquo;t load the WebAssembly module. Check the console for details.
            </div>
          )}
          {status === "loading" && (
            <div className="aspect-[8/5] flex items-center justify-center text-sm text-paper/60">
              Loading WASM module&hellip;
            </div>
          )}
          <canvas
            ref={canvasRef}
            width={dims.width}
            height={dims.height}
            className={status === "ready" ? "block" : "hidden"}
            style={isFullscreen ? { width: "100vw", height: "100vh" } : { width: "100%", height: "auto" }}
          />
          <canvas ref={pherCanvasRef} className="hidden" aria-hidden />
          <canvas ref={searchCanvasRef} className="hidden" aria-hidden />

          {/* The Fullscreen API promotes this container above the rest of the
              page, so the controls bar below becomes invisible and unclickable
              while active — this overlay button is the only reachable exit
              besides the browser's own Escape handling. */}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="fixed top-4 right-4 z-50 text-sm font-medium px-3 py-1.5 bg-black/70 border border-paper/30 text-paper hover:border-gold hover:text-gold transition-colors"
            >
              Exit Fullscreen
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div className="flex flex-wrap items-center gap-4 bg-paper/5 border border-paper/15 px-4 py-3">
            <label className="flex items-center gap-3 text-sm flex-1 min-w-[220px]">
              <span className="text-paper/60 whitespace-nowrap">Ants: {antCount}</span>
              <input
                type="range"
                min={MIN_ANT_COUNT}
                max={MAX_ANT_COUNT}
                step={50}
                value={antCount}
                onChange={(e) => handleAntCountChange(Number(e.target.value))}
                className="flex-1"
              />
            </label>

            <button
              onClick={() => setRunning((r) => !r)}
              className="text-sm font-medium px-3 py-1.5 border border-paper/30 hover:border-gold hover:text-gold transition-colors"
            >
              {running ? "Pause" : "Resume"}
            </button>

            <button
              onClick={handleReset}
              className="text-sm font-medium px-3 py-1.5 border border-paper/30 hover:border-gold hover:text-gold transition-colors"
            >
              Reset
            </button>

            <button
              onClick={toggleFullscreen}
              className="text-sm font-medium px-3 py-1.5 border border-paper/30 hover:border-gold hover:text-gold transition-colors"
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>

            <label className="flex items-center gap-2 text-sm text-paper/60">
              <input
                type="checkbox"
                checked={showTrails}
                onChange={(e) => setShowTrails(e.target.checked)}
              />
              Pheromone trails
            </label>
          </div>

          <div className="bg-paper/5 border border-paper/15 px-4 py-3 text-sm flex items-center justify-around gap-4">
            <div>
              <div className="text-paper/50 text-xs uppercase tracking-wide">FPS</div>
              <div className="font-display text-2xl">{fps}</div>
            </div>
            <div>
              <div className="text-paper/50 text-xs uppercase tracking-wide">Collected</div>
              <div className="font-display text-2xl">{collected}</div>
            </div>
          </div>
        </div>

        <div className="mt-16 prose prose-invert prose-sm max-w-2xl text-paper/65">
          <h2 className="font-display text-2xl text-paper mb-3">How it works</h2>
          <p>
            Every ant is a few floats in a flat array: position, heading,
            whether it&rsquo;s carrying food. An ant carrying food always
            steers toward the nest, depositing green pheromone as it
            goes &mdash; following its own trail home when one exists,
            and a direct bearing when it doesn&rsquo;t. Pheromone decays
            every step, so trails to depleted or distant food fade while
            trails to good, close food get reinforced.
          </p>
          <p>
            Foragers work differently, and deliberately never look at
            the green trail directly &mdash; since every trip starts and
            ends at the nest, green concentration naturally peaks at the
            hub, so &ldquo;follow the strongest scent&rdquo; would just
            pull food-less ants back home instead of out to food. Instead,
            a forager that finds itself standing on a green trail with no
            purple on it yet heads away from the nest and starts laying
            down purple as it walks &mdash; a directional marker meaning
            &ldquo;this way, confirmed.&rdquo; Every forager after that
            treats any nearby purple as its top priority, so the purple
            front rides the green trail all the way out to the food,
            bending around whatever obstacles the trail already bent
            around. No ant knows the shortest path; the colony finds it
            anyway.
          </p>
          <p>
            The rocks are procedurally scattered into dozens of overlapping
            clusters &mdash; a fresh, random maze-like layout every time
            you hit Reset. Ants bounce off them, so a trail that would
            otherwise cut straight through a rock has to bend around it,
            and pheromone reinforcement gradually favors whichever route
            around the obstacle turns out shorter.
          </p>
          <p>
            The Rust side never serializes data across the JS/WASM boundary.
            It exposes raw pointers into its own linear memory, and the
            canvas renderer wraps those pointers in{" "}
            <code>Float32Array</code>/<code>Uint8Array</code> views each
            frame &mdash; a read, not a copy. That&rsquo;s what makes several
            thousand ants at 60fps possible in a browser tab.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AntSimulation;
