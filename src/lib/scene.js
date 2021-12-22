import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function loadScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x444444);

  const camera = new THREE.PerspectiveCamera(75, devicePixelRatio, 0.1, 100);
  camera.position.set(0, 2, 3);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);

  return {
    scene,
    camera,
    renderer
  }
};

export function loadControls(
  camera,
  renderer,
  target = new THREE.Vector3(0, 0, 0),
  options = {
    enablePan: true,
    enableRotate: true
  }
) {
  const controls = new OrbitControls(camera, renderer.domElement);
  const { enablePan, enableRotate } = options;
  controls.target = target;
  controls.enablePan = enablePan;
  controls.enableRotate = enableRotate;
  controls.update();

  return controls;
}