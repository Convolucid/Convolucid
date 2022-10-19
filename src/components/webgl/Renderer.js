import * as THREE from "three";
import Experience from "./Experience.js";

export default class Renderer {
    constructor() {
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.debug = this.experience.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("Renderer");
            this.debugFolder.close();
        }

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });

        this.debugObject = {};
        this.debugObject.clearColor = new THREE.Color(0.95, 0.95, 0.95);
        this.debugObject.clearAlpha = 0.85;

        this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        // this.instance.toneMapping = THREE.NoToneMapping
        // this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = false;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setClearColor(this.debugObject.clearColor);
        this.instance.setClearAlpha(this.debugObject.clearAlpha);
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);

        // Debug Options
        if (this.debug.active) {
            this.debugFolder
                .addColor(this.debugObject, "clearColor")
                .name("clearColor")
                .onChange(() => {
                    this.instance.setClearColor(this.debugObject.clearColor);
                    this.instance.setClearAlpha(this.debugObject.clearAlpha);
                });
        }
    }

    convertColorString(color) {
        const colorArray = color
            .slice(color.indexOf("(") + 1, color.indexOf(")"))
            .split(", ");

        for (let i = 0; i < colorArray.length; i++) {
            colorArray[i] /= 255;
        }

        const newColor = new THREE.Color(
            colorArray[0],
            colorArray[1],
            colorArray[2]
        );

        return newColor;
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.instance.setClearColor(this.debugObject.clearColor);
        this.instance.setClearAlpha(this.debugObject.clearAlpha);
        this.instance.render(this.scene, this.camera.instance);
    }
}
