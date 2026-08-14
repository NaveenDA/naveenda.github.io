declare namespace wasm_bindgen {
    /* tslint:disable */
    /* eslint-disable */

    export class Simulation {
        free(): void;
        [Symbol.dispose](): void;
        angle_ptr(): number;
        ant_count(): number;
        cell_size(): number;
        collected(): number;
        food_amount_ptr(): number;
        food_count(): number;
        food_x_ptr(): number;
        food_y_ptr(): number;
        has_food_ptr(): number;
        nest_radius(): number;
        nest_x(): number;
        nest_y(): number;
        constructor(width: number, height: number, ant_count: number, seed: number);
        obstacle_count(): number;
        obstacle_r_ptr(): number;
        obstacle_x_ptr(): number;
        obstacle_y_ptr(): number;
        pher_grid_h(): number;
        pher_grid_w(): number;
        pher_ptr(): number;
        pos_x_ptr(): number;
        pos_y_ptr(): number;
        reset(): void;
        search_pher_ptr(): number;
        set_ant_count(count: number): void;
        step(dt: number): void;
    }

    /**
     * Exposes this wasm instance's linear memory so JS can build zero-copy
     * typed-array views over the pointers above instead of serializing
     * per-ant data across the boundary every frame.
     */
    export function getMemory(): any;

}
declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_simulation_free: (a: number, b: number) => void;
    readonly getMemory: () => any;
    readonly simulation_angle_ptr: (a: number) => number;
    readonly simulation_ant_count: (a: number) => number;
    readonly simulation_cell_size: (a: number) => number;
    readonly simulation_collected: (a: number) => number;
    readonly simulation_food_amount_ptr: (a: number) => number;
    readonly simulation_food_count: (a: number) => number;
    readonly simulation_food_x_ptr: (a: number) => number;
    readonly simulation_food_y_ptr: (a: number) => number;
    readonly simulation_has_food_ptr: (a: number) => number;
    readonly simulation_nest_radius: (a: number) => number;
    readonly simulation_nest_x: (a: number) => number;
    readonly simulation_nest_y: (a: number) => number;
    readonly simulation_new: (a: number, b: number, c: number, d: number) => number;
    readonly simulation_obstacle_count: (a: number) => number;
    readonly simulation_obstacle_r_ptr: (a: number) => number;
    readonly simulation_obstacle_x_ptr: (a: number) => number;
    readonly simulation_obstacle_y_ptr: (a: number) => number;
    readonly simulation_pher_grid_h: (a: number) => number;
    readonly simulation_pher_grid_w: (a: number) => number;
    readonly simulation_pher_ptr: (a: number) => number;
    readonly simulation_pos_x_ptr: (a: number) => number;
    readonly simulation_pos_y_ptr: (a: number) => number;
    readonly simulation_reset: (a: number) => void;
    readonly simulation_search_pher_ptr: (a: number) => number;
    readonly simulation_set_ant_count: (a: number, b: number) => void;
    readonly simulation_step: (a: number, b: number) => void;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_start: () => void;
}

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
declare function wasm_bindgen (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
