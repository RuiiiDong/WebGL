import * as THREE from 'three';



// Scene
const scene = new THREE.Scene();

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Objects array
const objects = [];

// Sphere Geometry (Sun)
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
  radius, widthSegments, heightSegments
);

const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);
solarSystem.scale.set(2, 2, 2);

// Sun Material
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);  // make the sun large
solarSystem.add(sunMesh);
objects.push(sunMesh);

const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.position.x = 10;
solarSystem.add(earthMesh);
objects.push(earthMesh);

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

// Moon 
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);
 
const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(.5, .5, .5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

// Lighting
const light = new THREE.PointLight(0xFFFFFF, 1, 500);  // White light
light.position.set(0, 0, 0);  // Position the light at the center (where the Sun is)
scene.add(light);

// Camera (ensure the values are set correctly)
const fov = 75;  // Field of view (degrees)
const aspect = window.innerWidth / window.innerHeight;  // Aspect ratio
const near = 0.1;  // Near clipping plane
const far = 1000;  // Far clipping plane

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 50, 50);  // Set camera position
camera.lookAt(0, 0, 0);  // Make the camera look at the origin (0, 0, 0)

// Resize listener for the camera aspect ratio
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Animation variables
let time = 0;

// Animation Loop
function animate() {
  time += 0.01;  // Increment time for rotation

  // Rotate objects in the scene
  objects.forEach((obj) => {
    obj.rotation.y = time;
  });
  // add an AxesHelper to each node
objects.forEach((node) => {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add(axes);
  });

  // Render the scene from the perspective of the camera
  renderer.render(scene, camera);

  // Request the next frame
  renderer.setAnimationLoop(animate);
}

// Start the animation loop
animate();
