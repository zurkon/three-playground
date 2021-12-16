import './style.css';
import {
  Scene,
  Color,
  WebGLRenderer,
  PerspectiveCamera,
  Group,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  WireframeGeometry,
  LineSegments,
  PointLight,
  GridHelper,
  PointLightHelper
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

const gui = new GUI();

const data = {
  cube: {
    width: 10,
    height: 10,
    depth: 10,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
  },
  lights: [
    {
      x: -20,
      y: -20,
      z: -20
    },
    {
      x: 0,
      y: 20,
      z: 0
    },
    {
      x: 20,
      y: 20,
      z: 20
    }
  ]
}

const cubeFolder = gui.addFolder("Cube");
cubeFolder.open();
const lightsFolder = gui.addFolder("Lights");
const subFolders = []; // lights positions

function updateGeometry() {
  group.children[0].geometry.dispose(); // BoxGeometry
  group.children[1].geometry.dispose(); // WireframeGeometry

  const newGeometry = new BoxGeometry(data.cube.width, data.cube.height, data.cube.depth, data.cube.widthSegments, data.cube.heightSegments, data.cube.depthSegments);
  group.children[0].geometry = newGeometry;
  group.children[1].geometry = new WireframeGeometry(newGeometry);
}

function updatePosition() {
  for (let i = 0; i < 3; i++) {
    const { x, y, z } = data.lights[i];
    lights[i].position.set(x, y, z);
  }
}

// dat.gui Cube properties
cubeFolder.add(data.cube, 'width', 1, 20).onChange(updateGeometry);
cubeFolder.add(data.cube, 'height', 1, 20).onChange(updateGeometry);
cubeFolder.add(data.cube, 'depth', 1, 20).onChange(updateGeometry);
cubeFolder.add(data.cube, 'widthSegments', 1, 20).step(1).onChange(updateGeometry);
cubeFolder.add(data.cube, 'heightSegments', 1, 20).step(1).onChange(updateGeometry);
cubeFolder.add(data.cube, 'depthSegments', 1, 20).step(1).onChange(updateGeometry);

// Light 1
subFolders[0] = lightsFolder.addFolder("[0]");
subFolders[0].add(data.lights[0], 'x', -50, 50).onChange(updatePosition);
subFolders[0].add(data.lights[0], 'y', -50, 50).onChange(updatePosition);
subFolders[0].add(data.lights[0], 'z', -50, 50).onChange(updatePosition);
// Light 2
subFolders[1] = lightsFolder.addFolder("[1]");
subFolders[1].add(data.lights[1], 'x', -50, 50).onChange(updatePosition);
subFolders[1].add(data.lights[1], 'y', -50, 50).onChange(updatePosition);
subFolders[1].add(data.lights[1], 'z', -50, 50).onChange(updatePosition);
// Light 3
subFolders[2] = lightsFolder.addFolder("[2]");
subFolders[2].add(data.lights[2], 'x', -50, 50).onChange(updatePosition);
subFolders[2].add(data.lights[2], 'y', -50, 50).onChange(updatePosition);
subFolders[2].add(data.lights[2], 'z', -50, 50).onChange(updatePosition);

const scene = new Scene();
scene.background = new Color(0x444444);

const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 100);
camera.position.z = 30;

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

const grid = new GridHelper(50, 20, 0x888888);
grid.position.y = -10;

// Cube Object - Start
const group = new Group();

const geometry = new BoxGeometry(10, 10, 10);
const material = new MeshPhongMaterial({ color: 0xff0000 });

const wireframe = new WireframeGeometry(geometry);

group.add(new Mesh(geometry, material));
group.add(new LineSegments(wireframe));
// Cube Object - End

// PointLights e PointLightHelpers - Start
const lights = [];
const helpers = [];

for (let i = 0; i < 3; i++) {
  lights[i] = new PointLight(0xffffff, 1, 0);
  helpers[i] = new PointLightHelper(lights[i], 1);
}

lights[0].position.set(-20, -20, -20);
lights[1].position.set(0, 20, 0);
lights[2].position.set(20, 20, 20);
// PointLights e PointLightHelpers - End

// Add objects to Scene - Start
for (let i = 0; i < 3; i++) {
  scene.add(lights[i]);
  scene.add(helpers[i]);
}

scene.add(grid);
scene.add(group);
// Add objects to Scene - End

// Update Screen each frame
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