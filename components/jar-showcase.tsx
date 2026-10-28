"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import Image from "next/image";
import { useIsMounted } from "@/lib/use-mounted";
import { WebGLErrorBoundary, useHasWebGL } from "@/components/webgl-boundary";

function JarModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.6, 0.7, 1.35, 48]} />
          <meshPhysicalMaterial roughness={0.05} transmission={0.95} thickness={0.2} color="#fafafa" />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.52, 0.58, 0.75, 48]} />
          <meshStandardMaterial color="#d8a538" metalness={0.1} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.36, 0.44, 0.26, 48]} />
          <meshStandardMaterial color="#1c1c1c" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function JarCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 3], fov: 45 }}
      gl={{
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
        antialias: true,
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
      <JarModel />
      <Environment preset="city" />
      <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={1.75} minPolarAngle={1.3} />
    </Canvas>
  );
}

export function JarShowcase() {
  const isMounted = useIsMounted();
  const hasWebGL = useHasWebGL();

  const fallback = (
    <div className="relative flex h-[430px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] p-6">
      <div className="relative h-64 w-64">
        <Image
          src="/jar-placeholder.svg"
          alt="Nectare Honie Raw Jar"
          fill
          className="object-contain"
        />
      </div>
      <div className="pointer-events-none absolute bottom-4 text-center text-xs tracking-widest text-white/50">
        NECTARE HONIE • RAW RESERVE
      </div>
    </div>
  );

  if (!isMounted || !hasWebGL) {
    return fallback;
  }

  return (
    <div className="h-[430px] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0f0f0f]">
      <WebGLErrorBoundary fallback={fallback}>
        <JarCanvas />
      </WebGLErrorBoundary>
    </div>
  );
}
