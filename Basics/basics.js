import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.173.0/build/three.module.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    //create camera
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
       
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
       
        cube.position.x = x;
       
        return cube;
    }

    const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
    ];
    scene.add(cubes);

    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);//Point cible  (0, 0, 0)
    scene.add(light);
    
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
    
    
    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
   
    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();

