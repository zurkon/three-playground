import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function loadModel(scene, modelPath) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(modelPath, gltf => {
      scene.add(gltf.scene);

      resolve(gltf);
    }, undefined, (error) => {
      reject(error);
    })
  })
}