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
        
        this.debugObject = {}
        this.debugObject.ambientColor = new THREE.Color(0.7, 1.0, 1.0);
        this.debugObject.directionalColor = new THREE.Color(1.0, 1.0, 1.0);

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('World')
            this.debugFolder.close()
        }

        // Lights
        // Ambient light
        this.ambientLight = new THREE.AmbientLight(this.debugObject.ambientColor, 2.5)
        if(this.debug.active)
        {
            this.debugAmbientLight = this.debugFolder.addFolder('Ambient Light')
            this.debugAmbientLight.add(this.ambientLight, 'intensity').min(0).max(3).step(0.001).name('Intensity')
            this.debugAmbientLight.addColor(this.debugObject, 'ambientColor').name('Color').onChange(() =>
            {
                this.ambientLight.color = this.debugObject.ambientColor;
            })

            this.debugAmbientLight.close()
        }
        this.scene.add(this.ambientLight)
        
        // Directional Light
        this.directionalLight = new THREE.DirectionalLight(this.debugObject.directionalColor, 1)
        this.directionalLight.position.set(3, 0.25, 2)
        if(this.debug.active)
        {
            this.debugDirectionalLight = this.debugFolder.addFolder('Directional Light')
            this.debugDirectionalLight.add(this.directionalLight, 'intensity').min(0).max(3).step(0.001).name('Intensity')
            this.debugDirectionalLight.addColor(this.debugObject, 'directionalColor').name('Color').onChange(() =>
            {
                this.directionalLight.color = this.debugObject.directionalColor;
            })
            this.debugDirectionalLight.add(this.directionalLight.position, 'x').min(- 5).max(5).step(0.001)
            this.debugDirectionalLight.add(this.directionalLight.position, 'y').min(- 5).max(5).step(0.001)
            this.debugDirectionalLight.add(this.directionalLight.position, 'z').min(- 5).max(5).step(0.001)

            this.debugDirectionalLight.close()
        }
        this.scene.add(this.directionalLight)



        /**
         * Objects
         */
        this.material = new THREE.MeshStandardMaterial()
        this.material.metalness = 0.1
        this.material.roughness = 0.7
        if(this.debug.active)
        {
            this.debugSpheres = this.debugFolder.addFolder('Spheres')
            this.debugSpheres.add(this.material, 'metalness').min(0).max(1).step(0.001)
            this.debugSpheres.add(this.material, 'roughness').min(0).max(1).step(0.001)

            this.debugSpheres.close()
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


        // Galaxy
        this.galaxyParameters = {}
        this.galaxyParameters.count = 30000
        this.galaxyParameters.size = 0.05
        this.galaxyParameters.radius = 5
        this.galaxyParameters.branches = 7
        this.galaxyParameters.spin = 1
        this.galaxyParameters.randomness = 0.5
        this.galaxyParameters.randomnessPower = 5
        this.galaxyParameters.insideColor = '#eeeeee'
        this.galaxyParameters.outsideColor = '#575757'

        this.galaxyGeometry = null
        this.galaxyMaterial = null
        this.points = null





        this.generateGalaxy();

        if(this.debug.active)
        {
            this.debugGalaxy = this.debugFolder.addFolder('Galaxy')
            this.debugGalaxy.add(this.galaxyParameters, 'count').min(100).max(1000000).step(100).onFinishChange(() => {this.generateGalaxy()}).name('particle count')
            this.debugGalaxy.add(this.galaxyParameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(() => {this.generateGalaxy()}).name('particle size')
            this.debugGalaxy.add(this.galaxyParameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(() => {this.generateGalaxy()})
            this.debugGalaxy.add(this.galaxyParameters, 'branches').min(2).max(20).step(1).onFinishChange(() => {this.generateGalaxy()})
            this.debugGalaxy.add(this.galaxyParameters, 'spin').min(-5).max(5).step(1).onFinishChange(() => {this.generateGalaxy()}).name('spin intensity')
            this.debugGalaxy.add(this.galaxyParameters, 'randomness').min(0).max(2).step(0.01).onFinishChange(() => {this.generateGalaxy()}).name('particle randomness')
            this.debugGalaxy.add(this.galaxyParameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(() => {this.generateGalaxy()}).name('branch concentration')
            this.debugGalaxy.addColor(this.galaxyParameters, 'insideColor').onFinishChange(() => {this.generateGalaxy()})
            this.debugGalaxy.addColor(this.galaxyParameters, 'outsideColor').onFinishChange(() => {this.generateGalaxy()})

            this.debugGalaxy.close()
        }

    }

    generateGalaxy(){

        if(this.points !== null) {
            this.galaxyGeometry.dispose()
            this.galaxyMaterial.dispose()
            this.scene.remove(this.points)
        }

        this.galaxyGeometry = new THREE.BufferGeometry()
        const positions = new Float32Array(this.galaxyParameters.count * 3)
        const colors = new Float32Array(this.galaxyParameters.count * 3)

        const insideColor = new THREE.Color(this.galaxyParameters.insideColor)
        const outsideColor = new THREE.Color(this.galaxyParameters.outsideColor)



        for(let i = 0; i < this.galaxyParameters.count; i++) {
            const i3 = i * 3;

            // Position
            const radius = Math.random() * this.galaxyParameters.radius
            const spinAngle = radius * this.galaxyParameters.spin
            const branchAngle = (i % this.galaxyParameters.branches) / this.galaxyParameters.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), this.galaxyParameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.galaxyParameters.randomness * radius
            const randomY = Math.pow(Math.random(), this.galaxyParameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.galaxyParameters.randomness * radius
            const randomZ = Math.pow(Math.random(), this.galaxyParameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.galaxyParameters.randomness * radius
            
            positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[i3 + 1] = randomY
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            // Color
            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor, radius / this.galaxyParameters.radius)

            colors[i3 + 0] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b

        }

        this.galaxyGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        )

        this.galaxyGeometry.setAttribute(
            'color',
            new THREE.BufferAttribute(colors, 3)
        )


        // this.galaxyMaterial
        this.galaxyMaterial = new THREE.PointsMaterial({
            size: this.galaxyParameters.size,
            sizeAttenuation: true,
            // color: '#000000'
            // depthWrite: false,
            // blending: THREE.AdditiveBlending,
            vertexColors: true
        })

        // Points
        this.points = new THREE.Points(this.galaxyGeometry, this.galaxyMaterial)
        this.points.rotation.x += 1;
        this.points.position.z = -3;
        this.scene.add(this.points)
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

        // Update the galaxy
        this.points.rotation.y += 0.00005

        // Update the materials
        // this.material.roughness = Math.abs(Math.cos(elapsedTime * 0.25))
        // this.material.metalness = Math.abs(Math.sin(elapsedTime))
    }
}