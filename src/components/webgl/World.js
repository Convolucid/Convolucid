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
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.5)
        if(this.debug.active)
        {
            this.debugFolder.add(ambientLight, 'intensity').min(0).max(3).step(0.001).name('Ambient Light Intensity')
        }
        this.scene.add(ambientLight)
        
        // Directional Light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
        directionalLight.position.set(3, 0.25, 2)
        if(this.debug.active)
        {
            this.debugFolder.add(directionalLight, 'intensity').min(0).max(3).step(0.001).name('Directional Light Intensity')
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


        // Galaxy
        const parameters = {}
        parameters.count = 30000
        parameters.size = 0.05
        parameters.radius = 5
        parameters.branches = 7
        parameters.spin = 1
        parameters.randomness = 0.5
        parameters.randomnessPower = 5
        parameters.insideColor = '#eeeeee'
        parameters.outsideColor = '#575757'

        let galaxyGeometry = null
        let galaxyMaterial = null
        this.points = null



        const generateGalaxy = () => {

            if(this.points !== null) {
                galaxyGeometry.dispose()
                galaxyMaterial.dispose()
                this.scene.remove(this.points)
            }

            galaxyGeometry = new THREE.BufferGeometry()
            const positions = new Float32Array(parameters.count * 3)
            const colors = new Float32Array(parameters.count * 3)

            const insideColor = new THREE.Color(parameters.insideColor)
            const outsideColor = new THREE.Color(parameters.outsideColor)



            for(let i = 0; i < parameters.count; i++) {
                const i3 = i * 3;

                // Position
                const radius = Math.random() * parameters.radius
                const spinAngle = radius * parameters.spin
                const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

                const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
                const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
                const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
                
                positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
                positions[i3 + 1] = randomY
                positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

                // Color
                const mixedColor = insideColor.clone()
                mixedColor.lerp(outsideColor, radius / parameters.radius)

                colors[i3 + 0] = mixedColor.r
                colors[i3 + 1] = mixedColor.g
                colors[i3 + 2] = mixedColor.b

            }

            galaxyGeometry.setAttribute(
                'position',
                new THREE.BufferAttribute(positions, 3)
            )

            galaxyGeometry.setAttribute(
                'color',
                new THREE.BufferAttribute(colors, 3)
            )


            // galaxyMaterial
            galaxyMaterial = new THREE.PointsMaterial({
                size: parameters.size,
                sizeAttenuation: true,
                // color: '#000000'
                // depthWrite: false,
                // blending: THREE.AdditiveBlending,
                vertexColors: true
            })

            // Points
            this.points = new THREE.Points(galaxyGeometry, galaxyMaterial)
            this.points.rotation.x += 1;
            this.points.position.z = -3;
            this.scene.add(this.points)

            console.log(parameters)
        }

        generateGalaxy();

        if(this.debug.active)
        {
            this.debugFolder.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy).name('particle count')
            this.debugFolder.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy).name('particle size')
            this.debugFolder.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
            this.debugFolder.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
            this.debugFolder.add(parameters, 'spin').min(-5).max(5).step(1).onFinishChange(generateGalaxy).name('spin intensity')
            this.debugFolder.add(parameters, 'randomness').min(0).max(2).step(0.01).onFinishChange(generateGalaxy).name('particle randomness')
            this.debugFolder.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy).name('branch concentration')
            this.debugFolder.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
            this.debugFolder.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)
        }

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
        this.material.roughness = Math.abs(Math.cos(elapsedTime * 0.25))
        // this.material.metalness = Math.abs(Math.sin(elapsedTime))
    }
}