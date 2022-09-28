import * as THREE from 'three'
import Experience from './Experience.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        const geometry = new THREE.BoxGeometry(4, 4, 4)
        const material = new THREE.MeshBasicMaterial()
        this.mesh = new THREE.Mesh(geometry, material);

        this.scene.add(this.mesh);
    }

    update()
    {
        this.mesh.rotation.x += 0.002
        this.mesh.rotation.y += 0.0015
    }
}