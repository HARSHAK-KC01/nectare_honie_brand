"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";
import { useIsMounted } from "@/lib/use-mounted";
import { WebGLErrorBoundary, useHasWebGL } from "@/components/webgl-boundary";

// 1. Floating Central Honey Jar
function FloatingJar({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8} position={position}>
      <group ref={ref} scale={1.15}>
        {/* Outer Heavy Glass Jar */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.76, 1.5, 48]} />
          <meshPhysicalMaterial
            roughness={0.03}
            transmission={0.96}
            thickness={0.5}
            ior={1.5}
            color="#ffffff"
          />
        </mesh>
        {/* Rich Golden Amber Honey Liquid */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.62, 0.66, 1.1, 48]} />
          <meshStandardMaterial
            color="#e5a01d"
            roughness={0.15}
            metalness={0.1}
            emissive="#3d1d00"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Jar Lid (Matte Black with Gold Trim) */}
        <mesh position={[0, 0.82, 0]}>
          <cylinderGeometry args={[0.45, 0.5, 0.2, 48]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.73, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.05, 48]} />
          <meshStandardMaterial color="#f5b041" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

// 2. Handcrafted Honey Dipper with Drip
function HoneyDipper({ position = [2.2, 0.4, -0.4] }: { position?: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = -0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2.2} rotationIntensity={0.7} floatIntensity={1.2} position={position}>
      <group ref={ref} rotation={[0.4, 0.2, -0.6]} scale={0.9}>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 1.8, 24]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.6} />
        </mesh>
        {[-0.1, -0.22, -0.34, -0.46, -0.58].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <cylinderGeometry args={[0.26 - Math.abs(i - 2) * 0.04, 0.26 - Math.abs(i - 2) * 0.04, 0.08, 32]} />
            <meshStandardMaterial color="#c68233" roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0, -0.34, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.6, 24]} />
          <meshStandardMaterial color="#a06020" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.74, 0]}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshPhysicalMaterial color="#f5b041" transmission={0.88} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

// 3. Floating Hexagonal Honeycomb Cluster
function HoneycombCluster({ position = [-2.2, -0.3, -0.3] }: { position?: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  const cells = [
    [0, 0, 0],
    [0.45, 0.26, 0],
    [-0.45, 0.26, 0],
    [0.45, -0.26, 0],
    [-0.45, -0.26, 0],
    [0, 0.52, 0],
    [0, -0.52, 0],
  ];

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.9} position={position}>
      <group ref={ref} scale={0.95} rotation={[0.3, 0.4, 0.2]}>
        {cells.map(([x, y, z], idx) => (
          <mesh key={idx} position={[x, y, z]}>
            <cylinderGeometry args={[0.26, 0.26, 0.18, 6]} />
            <meshPhysicalMaterial
              color="#e89c19"
              roughness={0.18}
              metalness={0.1}
              transmission={0.4}
              clearcoat={0.5}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// 4. Weightless Suspended Amber Honey Droplets
function HoneyDroplets() {
  const droplets = [
    { pos: [-1.4, 1.5, 0.6], scale: 0.16 },
    { pos: [1.6, -1.2, 0.7], scale: 0.22 },
    { pos: [-1.9, -1.3, -0.5], scale: 0.18 },
    { pos: [1.8, 1.6, -0.8], scale: 0.2 },
    { pos: [0.6, -1.8, -0.4], scale: 0.14 },
    { pos: [-0.7, 1.9, -0.6], scale: 0.24 },
    { pos: [2.5, -0.2, 0.4], scale: 0.15 },
    { pos: [-2.6, 0.8, 0.2], scale: 0.17 },
  ];

  return (
    <>
      {droplets.map((d, i) => (
        <Float key={i} speed={2 + (i % 3)} rotationIntensity={0.4} floatIntensity={1.5} position={d.pos as [number, number, number]}>
          <mesh scale={d.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              color="#f5b041"
              transmission={0.88}
              thickness={0.6}
              roughness={0.08}
              ior={1.4}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function ZeroGravity3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 4.5], fov: 45 }}
      gl={{
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
        antialias: true,
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 3]} intensity={1.5} color="#fff6e5" />
      <directionalLight position={[-4, -3, -2]} intensity={0.8} color="#f5b041" />

      {/* Golden Floating Pollen/Amber Dust */}
      <Sparkles count={60} scale={7} size={2.5} speed={0.4} opacity={0.6} color="#f5b041" />

      {/* 3D Honey Suspension Objects */}
      <FloatingJar position={[0, 0, 0]} />
      <HoneyDipper position={[2.2, 0.4, -0.4]} />
      <HoneycombCluster position={[-2.2, -0.3, -0.3]} />
      <HoneyDroplets />

      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxPolarAngle={2.0}
        minPolarAngle={1.1}
      />
    </Canvas>
  );
}

function ZeroGravityFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#080808] p-8">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-[#f5b041]/15 blur-[120px]" />

      <div className="relative flex max-w-xl flex-col items-center text-center">
        <div className="relative mb-6 h-64 w-64">
          <Image
            src="/hero-honey-luxury.jpg"
            alt="Nectare Honie Suspended Raw Honey"
            fill
            className="rounded-2xl object-cover shadow-2xl"
          />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#f5b041]">
          RAW NECTAR • WEIGHTLESS SUSPENSION
        </p>
        <h4 className="mt-2 text-2xl font-bold text-white">Photorealistic Honey Experience</h4>
        <p className="mt-2 max-w-md text-xs leading-5 text-white/60">
          Rendered in high-fidelity precision showcasing pure unheated raw honey with natural pollen preservation.
        </p>
      </div>
    </div>
  );
}

export function ZeroGravityCanvas() {
  const isMounted = useIsMounted();
  const hasWebGL = useHasWebGL();

  if (!isMounted || !hasWebGL) {
    return <ZeroGravityFallback />;
  }

  return (
    <div className="relative h-full w-full">
      <WebGLErrorBoundary fallback={<ZeroGravityFallback />}>
        <ZeroGravity3DScene />
      </WebGLErrorBoundary>
    </div>
  );
}
