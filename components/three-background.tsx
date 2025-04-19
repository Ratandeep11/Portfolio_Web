"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

function Background() {
  return (
    <>
      {/* Soft ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional light to add depth */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      {/* Subtle stars in the background */}
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0.3}
        fade
        speed={1}
      />

      {/* Sparkles for additional visual interest */}
      <Sparkles
        count={100}
        scale={10}
        size={1}
        speed={0.3}
        opacity={0.2}
        color={"#88ccff"}
      />

      {/* Another sparkle layer with different properties */}
      <Sparkles
        count={50}
        scale={[20, 10, 10]}
        size={2}
        speed={0.2}
        opacity={0.15}
        color={"#aa88ff"}
      />

      {/* Floating objects to add depth */}
      <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
        <mesh position={[0, 5, -15]}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial
            color="#88ccff"
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
      </Float>

      <Float rotationIntensity={0.15} floatIntensity={0.3} speed={1.5}>
        <mesh position={[-8, -5, -10]}>
          <octahedronGeometry args={[2, 1]} />
          <meshStandardMaterial
            color="#aa88ff"
            transparent
            opacity={0.1}
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
}

export function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        dpr={[1, 2]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Background />
      </Canvas>
    </div>
  );
}
