import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import {RectAreaLightUniformsLib} from 'three/addons/lights/RectAreaLightUniformsLib.js';
import {RectAreaLightHelper} from 'three/addons/helpers/RectAreaLightHelper.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    RectAreaLightUniformsLib.init();

    //create camera
    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    const scene = new THREE.Scene();
    
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const planeSize = 40;
 
    const loader = new THREE.TextureLoader();
    const texture = loader.load('images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    //const planeMat = new THREE.MeshPhongMaterial
    //RectAreaLight only works with MeshStandardMaterial or MeshPhysicalMaterial
    const planeMat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);

    {
        const cubeSize = 4;
        const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        //const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
        const cubeMat = new THREE.MeshStandardMaterial({color: '#8AC'});
        const mesh = new THREE.Mesh(cubeGeo, cubeMat);
        mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
        scene.add(mesh);
    }
    {
        const sphereRadius = 3;
        const sphereWidthDivisions = 32;
        const sphereHeightDivisions = 16;
        const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        //const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
        const sphereMat = new THREE.MeshStandardMaterial({color: '#CA8'});
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
        scene.add(mesh);
    }

    class ColorGUIHelper {
        constructor(object, prop) {
          this.object = object;
          this.prop = prop;
        }
        get value() {
          return `#${this.object[this.prop].getHexString()}`;
        }
        set value(hexString) {
          this.object[this.prop].set(hexString);
        }
      }

    class DegRadHelper {
    constructor(obj, prop) {
        this.obj = obj;
        this.prop = prop;
    }
    get value() {
        return THREE.MathUtils.radToDeg(this.obj[this.prop]);
    }
    set value(v) {
        this.obj[this.prop] = THREE.MathUtils.degToRad(v);
    }
    }
    
    function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
    }

    //Ambient light color = materialColor * light.color * light.intensity;
    // const color = 0xFFFFFF;
    // const intensity = 1;
    // const light = new THREE.AmbientLight(color, intensity);
    // scene.add(light);

    // const gui = new GUI();
    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'intensity', 0, 5, 0.01);
  
    //HemisphereLight
    // const skyColor = 0xB1E1FF;  // light blue
    // const groundColor = 0xB97A20;  // brownish orange   
    // const intensity = 1;
    // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    // scene.add(light);

    // const gui = new GUI();
    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('skyColor');
    // gui.addColor(new ColorGUIHelper(light, 'groundColor'), 'value').name('groundColor');
    // gui.add(light, 'intensity', 0, 5, 0.01);

    // //DirectionalLight
    // const color = 0xFFFFFF;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // const helper = new THREE.DirectionalLightHelper(light);

    // light.position.set(0, 10, 0);
    // light.target.position.set(-5, 0, 0);
    // scene.add(light);
    // scene.add(light.target);
    // scene.add(helper);

    // function updateLight() {
    // light.target.updateMatrixWorld();
    // helper.update();
    // }
    // updateLight();

    // const gui = new GUI();
    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'intensity', 0, 5, 0.01);
    // gui.add(light.target.position, 'x', -10, 10);
    // gui.add(light.target.position, 'z', -10, 10);
    // gui.add(light.target.position, 'y', 0, 10);

    // makeXYZGUI(gui, light.position, 'position', updateLight);
    // makeXYZGUI(gui, light.target.position, 'target', updateLight);

    // //PointLight 
    // const color = 0xFFFFFF;
    // const intensity = 150;
    // const light = new THREE.PointLight(color, intensity);
    // light.position.set(0,10,0);
    // const helper = new THREE.PointLightHelper(light);
    // scene.add(light);
    // scene.add(helper);
    // function updateLight() {
    //     helper.update();
    //   }
    //   updateLight();

    // const gui = new GUI();
    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'intensity', 0, 250, 1);
    // gui.add(light, 'distance', 0, 40).onChange(updateLight);
    
    // makeXYZGUI(gui, light.position, 'position', updateLight);

    // //SpotLight
    // const color = 0xFFFFFF;
    // const intensity = 150;
    // const light = new THREE.SpotLight(color, intensity);
    // const helper = new THREE.SpotLightHelper(light);

    // light.position.set(0, 10, 0);
    // light.target.position.set(-5, 0, 0);
    // scene.add(light);
    // scene.add(light.target);
    // scene.add(helper);

    // function updateLight() {
    // light.target.updateMatrixWorld();
    // helper.update();
    // }
    // updateLight();

    // const gui = new GUI();
    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'intensity', 0, 250, 1);
    // gui.add(light, 'distance', 0, 40).onChange(updateLight);
    // gui.add(new DegRadHelper(light, 'angle'), 'value', 0, 90).name('angle').onChange(updateLight);
    // gui.add(light, 'penumbra', 0, 1, 0.01);

    // makeXYZGUI(gui, light.position, 'position', updateLight);
    // makeXYZGUI(gui, light.target.position, 'target', updateLight);

    //RectAreaLight
    const color = 0xFFFFFF;
    const intensity = 5;
    const width = 12;
    const height = 4;
    const light = new THREE.RectAreaLight(color, intensity, width, height);
    light.position.set(0, 10, 0);
    light.rotation.x = THREE.MathUtils.degToRad(-90);
    scene.add(light);
    
    const helper = new RectAreaLightHelper(light);
    light.add(helper);

    const gui = new GUI();
    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    gui.add(light, 'intensity', 0, 10, 0.01);
    gui.add(light, 'width', 0, 20);
    gui.add(light, 'height', 0, 20);
    gui.add(new DegRadHelper(light.rotation, 'x'), 'value', -180, 180).name('x rotation');
    gui.add(new DegRadHelper(light.rotation, 'y'), 'value', -180, 180).name('y rotation');
    gui.add(new DegRadHelper(light.rotation, 'z'), 'value', -180, 180).name('z rotation');
     
    makeXYZGUI(gui, light.position, 'position');
    
    function resizeRendererToDisplaySize(renderer){
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio; 
        const width = Math.floor(canvas.clientWidth * pixelRatio);
        const height = Math.floor(canvas.clientHeight * pixelRatio);
        const needResize=canvas.width!=width||canvas.height!=height;
        if(needResize){
            //Redimensionner uniquement le rendu WebGL sans modifier les styles CSS du canvas.
            renderer.setSize(width,height,false);
        }
        return needResize;
    }


    function render(time) {
    time *= 0.001;  // Remplacer les unités de temps par des secondes

    if(resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    
   
    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();

