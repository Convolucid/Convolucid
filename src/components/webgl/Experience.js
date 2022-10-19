import * as THREE from "three";
import Sizes from "./utils/Sizes.js";
import Debug from "./utils/Debug.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Time from "./utils/Time.js";
import World from "./World.js";
import Controls from "./utils/Controls.js";

let instance = null;

export default class Experience {
    constructor(canvas, controlElement) {
        // Singleton setup
        if (instance) {
            return instance;
        }

        instance = this;

        // Global access
        window.experience = this;

        this.canvas = canvas;
        this.controlElement = controlElement;

        // Setup
        this.debug = new Debug();
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();
        this.controls = new Controls();
    }

    resize() {
        this.sizes.resize();
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.time.update();
        this.world.update();
        this.camera.update();
        this.renderer.update();
        this.controls.update();
        window.requestAnimationFrame(() => this.update());
    }
}
