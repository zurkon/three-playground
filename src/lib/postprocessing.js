import * as THREE from 'three';
import { ShaderPass } from "three/examples/jsm/postprocessing/shaderPass";
import { FilmPass } from "three/examples/jsm/postprocessing/filmPass"
import { PixelShader } from "three/examples/jsm/shaders/PixelShader";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";

export function filmPass(composer, options = {
  noise: 0.35,
  scanlineIntensity: 0.5,
  scanlineCount: 256,
  grayscale: 0
}) {
  const { noise, scanlineIntensity, scanlineCount, grayscale } = options;
  const filmPass = new FilmPass(
    noise,                // noise intensity
    scanlineIntensity,    // scanline intensity
    scanlineCount,        // scanline count
    grayscale,            // grayscale
  );
  filmPass.name = 'film';

  composer.addPass(filmPass);
}

export function pixelShader(composer, pixelValue) {
  const shaderPass = new ShaderPass(PixelShader);
  shaderPass.uniforms.resolution.value = new THREE.Vector2(innerWidth, innerHeight);
  shaderPass.uniforms.pixelSize.value = pixelValue;
  shaderPass.name = 'pixel';
  // console.log(shaderPass);
  composer.addPass(shaderPass);
}

export function gammaShader(composer) {
  const shaderPass = new ShaderPass(GammaCorrectionShader);
  shaderPass.name = 'gamma';
  composer.addPass(shaderPass);
}