import * as THREE from 'three'
import Experience from "../Experience";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class Controls
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera.instance
        this.controlElement = this.experience.controlElement

        this.instance = new THREE.Vector2()

        
        // this.orbit = new OrbitControls(this.camera, this.controlElement)
        // this.orbit.enableZoom = false;
        
       
        window.addEventListener('mousemove', (event) =>
        {
            this.instance.x = event.clientX / this.sizes.width * 2 -1;
            this.instance.y = - (event.clientY / this.sizes.height * 2 -1)
        })
    }

    update()
    {
        // this.orbit.update()
    }
}
