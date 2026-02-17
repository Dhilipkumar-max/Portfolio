"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../HeroText";
import ParallaxBackground from "../ParallaxBackground";
import { Astronaut } from "../Astronaut";
import { Float } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import Loader from "../Loader";
import * as THREE from 'three';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth <= 853);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return (
      <section id="hero" className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space relative">
        <HeroText />
        <ParallaxBackground />
      </section>
    );
  }

  return (
    <section id="hero" className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space relative">
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.23 : 0.3}
                position={isMobile ? [0, -1.5, 0] : [1.3, -1, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

const target = new THREE.Vector3();
function Rig() {
  return useFrame((state) => {
    target.set(state.mouse.x / 10, 1 + state.mouse.y / 10, 3);
    state.camera.position.lerp(target, 0.05);
  });
}

export default Hero;