import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x444444);

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 1, 100);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

const grid = new THREE.GridHelper(50, 20, 0x888888);
grid.position.y = -10;

const group = new THREE.Group();

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });

const wireframe = new THREE.WireframeGeometry(geometry);

group.add(new THREE.Mesh(geometry, material));
group.add(new THREE.LineSegments(wireframe));

const lights = [];
const helpers = [];

for (let i = 0; i < 3; i++) {
  lights[i] = new THREE.PointLight(0xffffff, 1, 0);
  helpers[i] = new THREE.PointLightHelper(lights[i], 1);
}

lights[0].position.set(-20, -20, -20);
lights[1].position.set(0, 20, 0);
lights[2].position.set(20, 20, 20);

for (let i = 0; i < 3; i++) {
  scene.add(lights[i]);
  scene.add(helpers[i]);
}

scene.add(grid);

scene.add(group);

function render() {
  requestAnimationFrame(render);

  group.rotation.x += 0.01;
  group.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Update Camera Render on window's resize
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
})

render();

document.body.appendChild(renderer.domElement);