/* eslint-disable react/jsx-no-literals */
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

// --- Procedural Geometry Generators ---

function PipeGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // A long hollow tube for a pipe
  const tubeGeometry = useMemo(() => {
    const path = new THREE.LineCurve3(new THREE.Vector3(0, -2, 0), new THREE.Vector3(0, 2, 0));
    return new THREE.TubeGeometry(path, 20, 0.5, 32, false);
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} geometry={tubeGeometry}>
        <meshPhysicalMaterial 
          color="#1e90ff" // Primary color
          metalness={0.1}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.1}
        />
      </mesh>
    </Float>
  );
}

function FittingGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  // A T-piece fitting (three intersecting cylinders)
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group ref={groupRef}>
        {/* Vertical main body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 2, 32]} />
          <meshPhysicalMaterial color="#333333" metalness={0.5} roughness={0.2} clearcoat={1} />
        </mesh>
        {/* Horizontal branch */}
        <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.6, 0.6, 2, 32]} />
          <meshPhysicalMaterial color="#333333" metalness={0.5} roughness={0.2} clearcoat={1} />
        </mesh>
      </group>
    </Float>
  );
}

function ValveGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const handleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (handleRef.current) {
      // Turn handle slowly
      handleRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 1.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Main Body */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.7, 0.7, 2.5, 32]} />
          <meshPhysicalMaterial color="#0b6330" metalness={0.6} roughness={0.3} clearcoat={0.5} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 1.2, 32]} />
          <meshPhysicalMaterial color="#444" metalness={0.8} roughness={0.1} />
        </mesh>
        {/* Handle */}
        <mesh ref={handleRef} position={[0, 1.5, 0]}>
          <boxGeometry args={[2, 0.2, 0.4]} />
          <meshPhysicalMaterial color="#e63946" metalness={0.1} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// --- Main Viewer Component ---

interface Props {
  category: string;
}

export default function Product3DViewer({ category }: Props) {
  const lowerCat = category.toLowerCase();
  let Model = PipeGeometry;
  
  if (lowerCat.includes('fitting') || lowerCat.includes('transition')) {
    Model = FittingGeometry;
  } else if (lowerCat.includes('valve')) {
    Model = ValveGeometry;
  }

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px] relative rounded-3xl overflow-hidden bg-gradient-to-tr from-card to-background border border-card-border shadow-2xl cursor-grab active:cursor-grabbing group">
      
      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="bg-background/50 backdrop-blur-md border border-card-border px-3 py-1.5 rounded-full text-xs font-semibold text-foreground flex items-center gap-2 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Interactive 3D View
        </div>
      </div>
      <div className="absolute bottom-6 left-0 w-full text-center z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-background/80 backdrop-blur-md text-muted-foreground text-xs px-3 py-1.5 rounded-full border border-card-border shadow-sm">
          Drag to rotate • Scroll to zoom
        </span>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['transparent']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#1e90ff" />
        
        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Model */}
        <Model />

        {/* Shadows on the floor */}
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
        />

        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={12}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
