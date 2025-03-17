import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

const geometry2 = new THREE.SphereGeometry(1, 4, 4);
const material2 = new THREE.MeshBasicMaterial({color : 0x00ff00 })
const sphere = new THREE.Mesh(geometry2, material2);

scene.add(sphere);

camera.position.z = 5;

function animate() {
    renderer.render(scene, camera);
    sphere.rotation.x += 0.01;
    sphere.rotation.z += 0.01;
}

renderer.setAnimationLoop(animate);