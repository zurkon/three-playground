import React, { useEffect, useRef } from 'react';
import { three, newCube } from '../lib/scene';

const Container = () => {
  const refContainer = useRef();

  useEffect(() => {
    const { scene, camera, renderer } = three();

    const cube = newCube();

    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(innerWidth, innerHeight);
    });

    const canvas = refContainer.current.firstChild;

    // If container already has a ThreeJS canvas, remove it first...
    if (canvas) {
      refContainer.current.removeChild(canvas);
    }

    animate();

    refContainer.current.appendChild(renderer.domElement);

  }, [])

  return (
    <div ref={refContainer}>

    </div>
  );
}

export default Container;