import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
matcapTexture.colorSpace=THREE.SRGBColorSpace
/**
 * Font
 * */ 
const fontLoader= new FontLoader()
fontLoader.load('/fonts/helvetiker_regular.typeface.json',
    (font)=>{
        const textGeometry= new TextGeometry(
            "Hello Three.js",{
                font:font,
                size:0.5,
                depth:0.2,
                curveSegments:3,
                bevelEnabled:true,
                bevelThickness:0.03,
                bevelSize:0.02,
                bevelOffset:0,
                bevelSegments:3

            }
        )
        textGeometry.center()
        const material= new THREE.MeshMatcapMaterial({matcap:matcapTexture})
        
        const text= new THREE.Mesh(textGeometry,material)

        scene.add(text)
        const donutMaterial= new THREE.MeshBasicMaterial({color:'red',wireframe:true})
        //Création des donut
        for (let i =0;i<120;i++){
            const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
            
            const donut= new THREE.Mesh(donutGeometry,donutMaterial)
            //Donut position
            donut.position.x=(Math.random()-0.5)*10
            donut.position.y=(Math.random()-0.5)*10
            donut.position.z=(Math.random()-0.5)*10

            //Rotation
            donut.rotation.x= Math.random()* Math.PI
            donut.rotation.y= Math.random()* Math.PI

            scene.add(donut)
        }
    }
)

/**
 * Sizes
 */
const sizes = {
    width: innerWidth,
    height: innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//OrbitControls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping=true

/**
 * Resize et fullscreen
 * */ 
// Resize
window.addEventListener('resize',()=>{
    //mise a jour de la taille de l'écran
    sizes.width=window.innerWidth
    sizes.height=window.innerHeight

    //Mise a jour de la caméra
    camera.aspect=sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Mise a jour du renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

//Fullscreen
window.addEventListener('dblclick',()=>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement){
        if (canvas.requestFullscreen){
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
    }
    else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
//Animation
const tick =()=>{
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()