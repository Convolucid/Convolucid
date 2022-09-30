import * as THREE from 'three'
import Experience from './Experience.js'


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.time = this.experience.time

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('World')
            this.debugFolder.close()
        }

        // Lights
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 2)
        if(this.debug.active)
        {
            this.debugFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient Light Intensity')
        }
        this.scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
        directionalLight.position.set(-3.5, 2, 4.5)
        if(this.debug.active)
        {
            this.debugFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('Directional Light Intensity')
            this.debugFolder.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
            this.debugFolder.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
            this.debugFolder.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
        }
        this.scene.add(directionalLight)



        /**
         * Objects
         */
        this.material = new THREE.MeshStandardMaterial()
        this.material.roughness = 0.7
        if(this.debug.active)
        {
            this.debugFolder.add(this.material, 'metalness').min(0).max(1).step(0.001)
            this.debugFolder.add(this.material, 'roughness').min(0).max(1).step(0.001)
        }


        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32),
            this.material
        )
        this.sphere2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 32, 32),
            this.material
        )
        this.sphere3 = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 32, 32),
            this.material
        )

        this.scene.add(this.sphere, this.sphere2, this.sphere3);
    }

    update()
    {
        const elapsedTime = this.time.elapsed * 0.0001

        // Update the sphere
        this.sphere.position.x = 1.5 * Math.sin(elapsedTime * 0.8)
        this.sphere.position.z = 1.5 * Math.cos(elapsedTime * 1)
        this.sphere.position.y = (Math.abs(Math.sin(elapsedTime * 0.15)) * 1.4) - 1.25

        this.sphere2.position.x = 1.75 * Math.sin(elapsedTime * 0.7)
        this.sphere2.position.z = 1.75 * Math.cos(elapsedTime * 0.4)
        this.sphere2.position.y = (Math.abs(Math.sin(elapsedTime * 0.4)) * 0.1) + 1.25

        this.sphere3.position.x = 3 * Math.sin(elapsedTime * 0.2)
        this.sphere3.position.z = 3 * Math.cos(elapsedTime * 0.5)
        this.sphere3.position.y = (Math.abs(Math.sin(elapsedTime * 0.3)) * 0.1) + 0.5

            // Update the materials
        this.material.roughness = Math.abs(Math.cos(elapsedTime * 0.25))
        // this.material.metalness = Math.abs(Math.sin(elapsedTime))
    }
}