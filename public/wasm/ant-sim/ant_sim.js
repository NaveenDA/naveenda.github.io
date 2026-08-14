let wasm_bindgen = (function(exports) {
    let script_src;
    if (typeof document !== 'undefined' && document.currentScript !== null) {
        script_src = new URL(document.currentScript.src, location.href).toString();
    }

    class Simulation {
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            SimulationFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_simulation_free(ptr, 0);
        }
        /**
         * @returns {number}
         */
        angle_ptr() {
            const ret = wasm.simulation_angle_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        ant_count() {
            const ret = wasm.simulation_ant_count(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        cell_size() {
            const ret = wasm.simulation_cell_size(this.__wbg_ptr);
            return ret;
        }
        /**
         * @returns {number}
         */
        collected() {
            const ret = wasm.simulation_collected(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        food_amount_ptr() {
            const ret = wasm.simulation_food_amount_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        food_count() {
            const ret = wasm.simulation_food_count(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        food_x_ptr() {
            const ret = wasm.simulation_food_x_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        food_y_ptr() {
            const ret = wasm.simulation_food_y_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        has_food_ptr() {
            const ret = wasm.simulation_has_food_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        nest_radius() {
            const ret = wasm.simulation_nest_radius(this.__wbg_ptr);
            return ret;
        }
        /**
         * @returns {number}
         */
        nest_x() {
            const ret = wasm.simulation_nest_x(this.__wbg_ptr);
            return ret;
        }
        /**
         * @returns {number}
         */
        nest_y() {
            const ret = wasm.simulation_nest_y(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {number} width
         * @param {number} height
         * @param {number} ant_count
         * @param {number} seed
         */
        constructor(width, height, ant_count, seed) {
            const ret = wasm.simulation_new(width, height, ant_count, seed);
            this.__wbg_ptr = ret;
            SimulationFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        /**
         * @returns {number}
         */
        obstacle_count() {
            const ret = wasm.simulation_obstacle_count(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        obstacle_r_ptr() {
            const ret = wasm.simulation_obstacle_r_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        obstacle_x_ptr() {
            const ret = wasm.simulation_obstacle_x_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        obstacle_y_ptr() {
            const ret = wasm.simulation_obstacle_y_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        pher_grid_h() {
            const ret = wasm.simulation_pher_grid_h(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        pher_grid_w() {
            const ret = wasm.simulation_pher_grid_w(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        pher_ptr() {
            const ret = wasm.simulation_pher_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        pos_x_ptr() {
            const ret = wasm.simulation_pos_x_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @returns {number}
         */
        pos_y_ptr() {
            const ret = wasm.simulation_pos_y_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        reset() {
            wasm.simulation_reset(this.__wbg_ptr);
        }
        /**
         * @returns {number}
         */
        search_pher_ptr() {
            const ret = wasm.simulation_search_pher_ptr(this.__wbg_ptr);
            return ret >>> 0;
        }
        /**
         * @param {number} count
         */
        set_ant_count(count) {
            wasm.simulation_set_ant_count(this.__wbg_ptr, count);
        }
        /**
         * @param {number} dt
         */
        step(dt) {
            wasm.simulation_step(this.__wbg_ptr, dt);
        }
    }
    if (Symbol.dispose) Simulation.prototype[Symbol.dispose] = Simulation.prototype.free;
    exports.Simulation = Simulation;

    /**
     * Exposes this wasm instance's linear memory so JS can build zero-copy
     * typed-array views over the pointers above instead of serializing
     * per-ant data across the boundary every frame.
     * @returns {any}
     */
    function getMemory() {
        const ret = wasm.getMemory();
        return ret;
    }
    exports.getMemory = getMemory;
    function __wbg_get_imports() {
        const import0 = {
            __proto__: null,
            __wbg___wbindgen_memory_5dc2a138835b0f8e: function() {
                const ret = wasm.memory;
                return ret;
            },
            __wbg___wbindgen_throw_bb96b2010945f0bc: function(arg0, arg1) {
                throw new Error(getStringFromWasm0(arg0, arg1));
            },
            __wbindgen_init_externref_table: function() {
                const table = wasm.__wbindgen_externrefs;
                const offset = table.grow(4);
                table.set(0, undefined);
                table.set(offset + 0, undefined);
                table.set(offset + 1, null);
                table.set(offset + 2, true);
                table.set(offset + 3, false);
            },
        };
        return {
            __proto__: null,
            "./ant_sim_bg.js": import0,
        };
    }

    const SimulationFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_simulation_free(ptr, 1));

    function getStringFromWasm0(ptr, len) {
        return decodeText(ptr >>> 0, len);
    }

    let cachedUint8ArrayMemory0 = null;
    function getUint8ArrayMemory0() {
        if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
            cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
        }
        return cachedUint8ArrayMemory0;
    }

    let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    function decodeText(ptr, len) {
        return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
    }

    let wasmModule, wasmInstance, wasm;
    function __wbg_finalize_init(instance, module) {
        wasmInstance = instance;
        wasm = instance.exports;
        wasmModule = module;
        cachedUint8ArrayMemory0 = null;
        wasm.__wbindgen_start();
        return wasm;
    }

    async function __wbg_load(module, imports) {
        if (typeof Response === 'function' && module instanceof Response) {
            if (!module.ok) {
                throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
            }

            if (typeof WebAssembly.instantiateStreaming === 'function') {
                try {
                    return await WebAssembly.instantiateStreaming(module, imports);
                } catch (e) {
                    const validResponse = expectedResponseType(module.type);

                    if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                    } else { throw e; }
                }
            }

            const bytes = await module.arrayBuffer();
            return await WebAssembly.instantiate(bytes, imports);
        } else {
            const instance = await WebAssembly.instantiate(module, imports);

            if (instance instanceof WebAssembly.Instance) {
                return { instance, module };
            } else {
                return instance;
            }
        }

        function expectedResponseType(type) {
            switch (type) {
                case 'basic': case 'cors': case 'default': return true;
            }
            return false;
        }
    }

    function initSync(module) {
        if (wasm !== undefined) return wasm;


        if (module !== undefined) {
            if (Object.getPrototypeOf(module) === Object.prototype) {
                ({module} = module)
            } else {
                console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
            }
        }

        const imports = __wbg_get_imports();
        if (!(module instanceof WebAssembly.Module)) {
            module = new WebAssembly.Module(module);
        }
        const instance = new WebAssembly.Instance(module, imports);
        return __wbg_finalize_init(instance, module);
    }

    async function __wbg_init(module_or_path) {
        if (wasm !== undefined) return wasm;


        if (module_or_path !== undefined) {
            if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
                ({module_or_path} = module_or_path)
            } else {
                console.warn('using deprecated parameters for the initialization function; pass a single object instead')
            }
        }

        if (module_or_path === undefined && script_src !== undefined) {
            module_or_path = script_src.replace(/\.js$/, "_bg.wasm");
        }
        const imports = __wbg_get_imports();

        if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
            module_or_path = fetch(module_or_path);
        }

        const { instance, module } = await __wbg_load(await module_or_path, imports);

        return __wbg_finalize_init(instance, module);
    }

    return Object.assign(__wbg_init, { initSync }, exports);
})({ __proto__: null });
