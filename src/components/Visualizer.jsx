import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GUI } from 'dat.gui';
import { loadModel } from '../lib/model';
import { filmPass, gammaShader, glitchPass, pixelShader } from '../lib/postprocessing';
import { loadControls, loadScene } from '../lib/scene';

const Visualizer = () => {
  const ref = useRef();

  useEffect(() => {
    let mixer;
    let obj;
    const gui = new GUI();
    const data = {
      gamma: false,
      glitch: false,
      film: false,
      pixel: false
    }
    const shaders = {
      gamma: () => {
        gammaShader(composer)
      },
      glitch: () => {
        glitchPass(composer)
      },
      film: () => {
        filmPass(composer, {
          noise: 0.5,
          scanlineIntensity: 0.5,
          scanlineCount: 250,
          grayscale: 0
        })
      },
      pixel: () => {
        pixelShader(composer, 4)
      },
    }

    function applyPostProcessing() {
      // console.log(this.property);
      // console.log(data[this.property]);
      if (data[this.property] === true) {
        shaders[this.property]();
      } else {
        const filtered = composer.passes.filter(pass => {
          return pass.name === this.property
        });
        composer.removePass(filtered[0]);
      }
    }
    gui.add(data, 'gamma').name("Gamma Correction").onChange(applyPostProcessing);
    gui.add(data, 'glitch').name("Glitch Shader").onChange(applyPostProcessing);
    gui.add(data, 'film').name("Film Shader").onChange(applyPostProcessing);
    gui.add(data, 'pixel').name("Pixel Shader").onChange(applyPostProcessing);

    const { scene, camera, renderer } = loadScene();

    const controls = loadControls(camera, renderer, new THREE.Vector3(0, 1, 0), { enablePan: false });

    const clock = new THREE.Clock();

    const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
    scene.add(ambientLight);

    loadModel(scene, 'src/assets/model/scene.gltf')
      .then(model => {
        // console.log(model);
        obj = model.scene;
        mixer = new THREE.AnimationMixer(model.scene);
        mixer.clipAction(model.animations[0]).play();

        animation();
      })

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    function animation() {
      requestAnimationFrame(animation);

      if (obj) {
        obj.rotation.y += 0.01;
      }

      if (mixer) mixer.update(clock.getDelta());

      composer.render();
    }

    addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(innerWidth, innerHeight);
    });

    ref.current.appendChild(renderer.domElement);

    return () => {
      console.log('unmount');
      ref.current.firstChild && ref.current.removeChild(ref.current.firstChild);
      renderer.dispose();
      gui.destroy();
    }

  }, []);

  return (
    <div ref={ref}>

    </div>
  );
}

export default Visualizer;