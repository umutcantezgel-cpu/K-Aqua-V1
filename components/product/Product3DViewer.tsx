/* eslint-disable react/jsx-no-literals, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, useGLTF, useKTX2, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { EffectComposer, SSAO, Bloom, SMAA } from '@react-three/postprocessing';
import { shaderMaterial } from '@react-three/drei';
import gsap from 'gsap';
import { useProductCatalogStore } from '@/lib/useProductCatalogStore';

// Extend THREE prototypes for raycasting acceleration via three-mesh-bvh
if (typeof window !== 'undefined') {
  try {
    (THREE.BufferGeometry.prototype as any).computeBoundsTree = computeBoundsTree;
    (THREE.BufferGeometry.prototype as any).disposeBoundsTree = disposeBoundsTree;
    (THREE.Mesh.prototype as any).raycast = acceleratedRaycast;
  } catch (e) {
    console.warn('Failed to initialize three-mesh-bvh acceleration:', e);
  }
}

// --- Custom WebGL 2.0 / GLSL 300 ES-ready Water Shader Material ---
const WaterShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uFlowSpeed: 1.0,
    uWaveHeight: 0.08,
    uColorBase: new THREE.Color('#1e90ff'),
    uColorCrest: new THREE.Color('#a8dadc'),
    uOpacity: 0.6,
    uEnvironmentMap: null,
    uUseEnvMap: 0.0,
  },
  // Vertex Shader (includes 3D Simplex Noise & fBm)
  `
  uniform float uTime;
  uniform float uFlowSpeed;
  uniform float uWaveHeight;
  
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }
  
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 3; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vUv = uv;
    vec3 noisePos = position * 2.5 + vec3(0.0, uTime * uFlowSpeed * 1.0, 0.0);
    float noiseVal = fbm(noisePos);
    vec3 displaced = position + normal * noiseVal * uWaveHeight;
    
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
  `,
  // Fragment Shader (includes Fresnel refraction & Env reflection mapping)
  `
  uniform vec3 uColorBase;
  uniform vec3 uColorCrest;
  uniform float uOpacity;
  uniform samplerCube uEnvironmentMap;
  uniform float uUseEnvMap;
  uniform float uTime;
  
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  
  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = dot(viewDir, vNormal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    float fresnelFactor = pow(fresnel, 3.0);
    
    vec3 waterColor = mix(uColorBase, uColorCrest, fresnelFactor);
    vec3 reflectedColor = vec3(0.0);
    
    if (uUseEnvMap > 0.5) {
      vec3 reflectedLight = reflect(-viewDir, vNormal);
      reflectedColor = textureCube(uEnvironmentMap, reflectedLight).rgb;
    }
    
    vec3 finalColor = waterColor;
    if (uUseEnvMap > 0.5) {
      finalColor = mix(waterColor, reflectedColor, fresnelFactor * 0.7);
    }
    
    // Add moving caustics wave fake
    float caustics = sin(vUv.x * 30.0 + uTime * 4.0) * cos(vUv.y * 30.0 - uTime * 3.0) * 0.06;
    finalColor += vec3(caustics);
    
    gl_FragColor = vec4(finalColor, uOpacity);
  }
  `
);

// Register custom shader material as R3F element
WaterShaderMaterial.prototype.glslVersion = THREE.GLSL3;
extend({ WaterShaderMaterial });

// Configure useGLTF draco decoder globally
try {
  useGLTF.setDecoderPath('/draco/');
} catch (e) {
  console.warn('Failed to set decoder path for Draco loader:', e);
}

// --- React Error Boundary to handle missing asset fallbacks ---
class GLTFErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: any) {
    // Gracefully handle file not found or load failure
    console.log('GLTF loader failed. Gracefully falling back to procedural model:', error.message || error);
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// --- Dynamic GLTF Loader Component (Attempts to load Draco GLB & KTX2) ---
function GLTFLoaderComponent({ category }: { category: string }) {
  const { gl } = useThree();
  
  // Try loading GLB with Draco decoder configured
  const { scene } = useGLTF('/models/k-aqua-product.glb', true);
  
  // Try loading KTX2 textures with local transcoder path configured
  const ktxTexture = useKTX2('/textures/water_normals.ktx2', '/basis/');

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.geometry) {
          // Raycasting acceleration via bounds trees
          (child.geometry as any).computeBoundsTree();
          
          // Apply KTX2 texture as normal map if loaded
          if (ktxTexture && child.material) {
            (child.material as any).normalMap = ktxTexture;
            child.material.needsUpdate = true;
          }
        }
      });
    }
    return () => {
      if (scene) {
        scene.traverse((child: any) => {
          if (child.isMesh && child.geometry) {
            (child.geometry as any).disposeBoundsTree();
          }
        });
      }
    };
  }, [scene, ktxTexture]);

  return <primitive object={scene} />;
}

// --- GPU Instanced Mass Bubble Simulation Component (10,000 bubbles) ---
const BUBBLE_COUNT = 10000;
interface BubbleData {
  x: number;
  y: number;
  z: number;
  speed: number;
  scale: number;
}

function WaterBubbles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Retrieve speed from global Zustand store
  const flowSpeed = useProductCatalogStore((state) => state.flowSpeed);
  
  // Pre-instantiated object to compute matrix transformation with zero GC inside useFrame
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Cache individual bubble attributes
  const bubbles = useMemo<BubbleData[]>(() => {
    const list: BubbleData[] = [];
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      list.push({
        x: (Math.random() - 0.5) * 0.7,
        y: (Math.random() - 0.5) * 3.6,
        z: (Math.random() - 0.5) * 0.7,
        speed: 0.3 + Math.random() * 0.8,
        scale: 0.004 + Math.random() * 0.012,
      });
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Bubble rising animation loop with zero heap allocation (reusing dummy object)
    const factor = flowSpeed;
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const b = bubbles[i]!;
      b.y += b.speed * delta * factor;
      if (b.y > 1.8) {
        b.y = -1.8; // reset position at bottom
      }
      
      dummy.position.set(b.x, b.y, b.z);
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, BUBBLE_COUNT]}>
      {/* 4x4 low segment count sphere for high performance */}
      <sphereGeometry args={[1, 4, 4]} />
      <meshPhysicalMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.35} 
        roughness={0.1}
        transmission={0.9} 
      />
    </instancedMesh>
  );
}

// --- Procedural / Custom Fallback Geometry component ---
function ProceduralFallback({ category }: { category: string }) {
  const lowerCat = category.toLowerCase();
  
  // Sub-component refs for GSAP Exploded View animation
  const groupRef = useRef<THREE.Group>(null);
  const part1Ref = useRef<THREE.Mesh>(null);
  const part2Ref = useRef<THREE.Mesh>(null);
  const handleRef = useRef<THREE.Mesh>(null);

  // Instantiated water shader material
  const waterMaterial = useMemo(() => {
    const mat = new WaterShaderMaterial();
    mat.transparent = true;
    mat.depthWrite = false;
    return mat;
  }, []);

  // Geometry references to compute / dispose bounds tree (BVH)
  const glassGeoRef1 = useRef<THREE.BufferGeometry>(null);
  const glassGeoRef2 = useRef<THREE.BufferGeometry>(null);
  const waterGeoRef = useRef<THREE.BufferGeometry>(null);

  // Sync state with Zustand store
  const flowSpeed = useProductCatalogStore((state) => state.flowSpeed);
  const waterColor = useProductCatalogStore((state) => state.waterColor);
  const isExploded = useProductCatalogStore((state) => state.isExploded);
  const setActiveComponent = useProductCatalogStore((state) => state.setActiveComponent);

  // Pre-allocated THREE.Color instances to avoid GC in useFrame
  const baseColorHelper = useMemo(() => new THREE.Color(), []);
  const crestColorHelper = useMemo(() => new THREE.Color(), []);

  // Compute bounding volume hierarchy on mount for fast raycasting
  useEffect(() => {
    const geos = [glassGeoRef1.current, glassGeoRef2.current, waterGeoRef.current];
    geos.forEach((g) => {
      if (g) (g as any).computeBoundsTree();
    });
    return () => {
      geos.forEach((g) => {
        if (g) (g as any).disposeBoundsTree();
      });
    };
  }, [category]);

  // GSAP Exploded View Animation logic
  useEffect(() => {
    if (lowerCat.includes('fitting') || lowerCat.includes('transition')) {
      if (part2Ref.current) {
        gsap.to(part2Ref.current.position, {
          x: isExploded ? 2.0 : 1.0,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    } else if (lowerCat.includes('valve')) {
      if (part2Ref.current && handleRef.current) {
        gsap.to(part2Ref.current.position, {
          y: isExploded ? 1.6 : 0.8,
          duration: 1.2,
          ease: 'power2.out',
        });
        gsap.to(handleRef.current.position, {
          y: isExploded ? 2.6 : 1.5,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    } else {
      // Pipe
      if (part1Ref.current && part2Ref.current) {
        gsap.to(part1Ref.current.position, {
          y: isExploded ? 2.8 : 2.0,
          duration: 1.2,
          ease: 'power2.out',
        });
        gsap.to(part2Ref.current.position, {
          y: isExploded ? -2.8 : -2.0,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    }
  }, [isExploded, lowerCat]);

  // Animate custom shader uniforms (Time, speed, color) in frame loop
  useFrame((state) => {
    if (waterMaterial) {
      const uniforms = waterMaterial.uniforms as any;
      if (uniforms) {
        uniforms.uTime.value = state.clock.getElapsedTime();
        uniforms.uFlowSpeed.value = flowSpeed;
        
        baseColorHelper.set(waterColor);
        uniforms.uColorBase.value.copy(baseColorHelper);
        
        // Compute a brighter color for waves/crests dynamically
        crestColorHelper.copy(baseColorHelper).addScalar(0.2);
        crestColorHelper.r = Math.min(1, Math.max(0, crestColorHelper.r));
        crestColorHelper.g = Math.min(1, Math.max(0, crestColorHelper.g));
        crestColorHelper.b = Math.min(1, Math.max(0, crestColorHelper.b));
        uniforms.uColorCrest.value.copy(crestColorHelper);
      }
    }
    
    // Slowly spin the model group gently
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  const handlePointerDown = (componentName: string, e: any) => {
    e.stopPropagation();
    setActiveComponent(componentName);
  };

  // Render high-poly custom geometries based on category
  if (lowerCat.includes('fitting') || lowerCat.includes('transition')) {
    return (
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
          {/* Main vertical outer translucent pipe */}
          <mesh 
            ref={part1Ref} 
            onPointerDown={(e) => handlePointerDown('Vertical Pipe', e)}
          >
            <cylinderGeometry ref={glassGeoRef1 as any} args={[0.6, 0.6, 3, 48]} />
            <meshPhysicalMaterial 
              color="#dcdde1" 
              transmission={0.8} 
              roughness={0.15} 
              thickness={1.0} 
              transparent 
            />
          </mesh>

          {/* Horizontal branched outer pipe */}
          <mesh 
            ref={part2Ref} 
            position={[1, 0, 0]} 
            rotation={[0, 0, Math.PI / 2]}
            onPointerDown={(e) => handlePointerDown('Horizontal Branch', e)}
          >
            <cylinderGeometry ref={glassGeoRef2 as any} args={[0.6, 0.6, 2, 48]} />
            <meshPhysicalMaterial 
              color="#dcdde1" 
              transmission={0.8} 
              roughness={0.15} 
              thickness={1.0} 
              transparent 
            />
          </mesh>

          {/* Inner water flow using custom shaders */}
          <mesh position={[0, 0, 0]} material={waterMaterial}>
            <cylinderGeometry ref={waterGeoRef as any} args={[0.54, 0.54, 3, 48]} />
          </mesh>

          {/* Mass bubbles flowing inside the water */}
          <WaterBubbles />
        </Float>
      </group>
    );
  }

  if (lowerCat.includes('valve')) {
    return (
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Main body pipe */}
          <mesh 
            ref={part1Ref} 
            rotation={[0, 0, Math.PI / 2]}
            onPointerDown={(e) => handlePointerDown('Valve Body', e)}
          >
            <cylinderGeometry ref={glassGeoRef1 as any} args={[0.7, 0.7, 3.2, 48]} />
            <meshPhysicalMaterial 
              color="#2f3640" 
              transmission={0.6} 
              roughness={0.2} 
              thickness={1.2} 
              transparent 
            />
          </mesh>

          {/* Valve neck */}
          <mesh 
            ref={part2Ref} 
            position={[0, 0.8, 0]}
            onPointerDown={(e) => handlePointerDown('Valve Neck', e)}
          >
            <cylinderGeometry ref={glassGeoRef2 as any} args={[0.4, 0.45, 1.2, 32]} />
            <meshPhysicalMaterial color="#718093" metalness={0.8} roughness={0.1} />
          </mesh>

          {/* Valve handle lever */}
          <mesh 
            ref={handleRef} 
            position={[0, 1.5, 0]}
            onPointerDown={(e) => handlePointerDown('Valve Handle', e)}
          >
            <boxGeometry args={[2.2, 0.25, 0.5]} />
            <meshPhysicalMaterial color="#c23616" roughness={0.3} metalness={0.1} />
          </mesh>

          {/* Inner flowing water */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={waterMaterial}>
            <cylinderGeometry ref={waterGeoRef as any} args={[0.62, 0.62, 3.2, 48]} />
          </mesh>

          <WaterBubbles />
        </Float>
      </group>
    );
  }

  // Default: Pipe geometry fallback
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Outer glass cylinder */}
        <mesh onPointerDown={(e) => handlePointerDown('Glass Cylinder', e)}>
          <cylinderGeometry ref={glassGeoRef1 as any} args={[0.5, 0.5, 4, 64, 16]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.9} 
            roughness={0.1} 
            thickness={1.0} 
            transparent 
          />
        </mesh>

        {/* Top flange cap */}
        <mesh 
          ref={part1Ref} 
          position={[0, 2.0, 0]}
          onPointerDown={(e) => handlePointerDown('Top Flange', e)}
        >
          <cylinderGeometry ref={glassGeoRef2 as any} args={[0.8, 0.8, 0.2, 32]} />
          <meshPhysicalMaterial color="#2f3542" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Bottom flange cap */}
        <mesh 
          ref={part2Ref} 
          position={[0, -2.0, 0]}
          onPointerDown={(e) => handlePointerDown('Bottom Flange', e)}
        >
          <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
          <meshPhysicalMaterial color="#2f3542" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Inner flowing water column */}
        <mesh material={waterMaterial}>
          <cylinderGeometry ref={waterGeoRef as any} args={[0.45, 0.45, 4.0, 64, 16]} />
        </mesh>

        {/* GPU Instanced particles inside the pipe */}
        <WaterBubbles />
      </Float>
    </group>
  );
}

// --- Cinematic Camera Controller Hook ---
interface CameraControllerProps {
  activeComponent: string | null;
  controlsRef: React.RefObject<any>;
}

function CameraController({ activeComponent, controlsRef }: CameraControllerProps) {
  const { camera } = useThree();

  useEffect(() => {
    let targetPos = { x: 0, y: 0, z: 8 };
    let targetLook = { x: 0, y: 0, z: 0 };

    if (activeComponent) {
      const name = activeComponent.toLowerCase();
      if (name.includes('branch') || name.includes('vertical') || name.includes('fitting')) {
        targetPos = { x: 3.5, y: 1.5, z: 5.5 };
        targetLook = { x: 0.5, y: 0, z: 0 };
      } else if (name.includes('valve') || name.includes('handle') || name.includes('neck')) {
        targetPos = { x: -3.5, y: 2.5, z: 5.0 };
        targetLook = { x: 0, y: 0.8, z: 0 };
      } else {
        // default pipe components
        targetPos = { x: 0, y: 0, z: 7 };
        targetLook = { x: 0, y: 0, z: 0 };
      }
    }

    // Smooth cinematic camera flight
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.8,
      ease: 'power3.inOut',
    });

    // OrbitControls target tracking animation
    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: targetLook.x,
        y: targetLook.y,
        z: targetLook.z,
        duration: 1.8,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.update();
          }
        },
      });
    }
  }, [activeComponent, camera, controlsRef]);

  return null;
}

// --- Main Viewer Component ---
interface Props {
  category: string;
}

export default function Product3DViewer({ category }: Props) {
  const controlsRef = useRef<any>(null);

  // Sync state selectors from global Zustand store
  const flowSpeed = useProductCatalogStore((state) => state.flowSpeed);
  const activeComponent = useProductCatalogStore((state) => state.activeComponent);
  const waterColor = useProductCatalogStore((state) => state.waterColor);
  const isExploded = useProductCatalogStore((state) => state.isExploded);

  const setFlowSpeed = useProductCatalogStore((state) => state.setFlowSpeed);
  const setActiveComponent = useProductCatalogStore((state) => state.setActiveComponent);
  const setWaterColor = useProductCatalogStore((state) => state.setWaterColor);
  const setIsExploded = useProductCatalogStore((state) => state.setIsExploded);

  // Set default active component based on prop
  useEffect(() => {
    setActiveComponent(category);
  }, [category, setActiveComponent]);

  return (
    <div className="w-full h-full min-h-[450px] lg:min-h-[550px] relative rounded-3xl overflow-hidden bg-gradient-to-tr from-card to-background border border-card-border shadow-2xl group">
      
      {/* UI Overlay Controls for store interaction sync */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-3 pointer-events-none">
        <div className="bg-background/80 backdrop-blur-md border border-card-border px-3.5 py-2 rounded-2xl text-xs font-semibold text-foreground flex items-center gap-2.5 shadow-sm pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="capitalize">{category} Active Sandbox</span>
        </div>

        {activeComponent && (
          <div className="bg-background/80 backdrop-blur-md border border-card-border px-3.5 py-2 rounded-2xl text-xs text-muted-foreground shadow-sm pointer-events-auto">
            Focused Part: <span className="font-semibold text-primary">{activeComponent}</span>
          </div>
        )}
      </div>

      {/* Control Panel Panel (Zustand Sync Demo UI) */}
      <div className="absolute bottom-6 right-6 z-10 bg-background/90 backdrop-blur-lg border border-card-border p-5 rounded-2xl flex flex-col gap-4 shadow-xl pointer-events-auto max-w-[280px]">
        <h4 className="text-sm font-bold text-foreground border-b border-card-border pb-2">3D Pipeline Console</h4>
        
        {/* Flow Speed Slider */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground flex justify-between font-medium">
            <span>Water Velocity:</span>
            <span className="text-primary font-bold">{flowSpeed.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min="0.0"
            max="3.0"
            step="0.1"
            value={flowSpeed}
            onChange={(e) => setFlowSpeed(parseFloat(e.target.value))}
            className="w-full h-1 bg-card-border rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Water Color Picker */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground font-medium">Water Color Palette:</span>
          <div className="flex gap-2">
            {[
              { label: 'Fresh', value: '#1e90ff' },
              { label: 'Bio', value: '#10ac84' },
              { label: 'Industrial', value: '#f1c40f' },
              { label: 'Purified', value: '#00d2d3' },
            ].map((col) => (
              <button
                key={col.value}
                onClick={() => setWaterColor(col.value)}
                className={`w-6 h-6 rounded-full border transition-all duration-200 ${
                  waterColor === col.value 
                    ? 'border-foreground scale-110 shadow-md' 
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: col.value }}
                title={col.label}
              />
            ))}
          </div>
        </div>

        {/* Exploded View Toggle */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground font-medium">Exploded View:</span>
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
              isExploded 
                ? 'bg-destructive/10 border-destructive text-destructive' 
                : 'bg-card border-card-border hover:bg-card/80 text-foreground'
            }`}
          >
            {isExploded ? 'Collapse' : 'Explode'}
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-background/80 backdrop-blur-md text-muted-foreground text-xs px-3 py-1.5 rounded-full border border-card-border shadow-sm">
          Orbit: Drag • Zoom: Scroll • Select: Click Mesh
        </span>
      </div>

      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['transparent']} />
        
        {/* Lighting configuration */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[8, 8, 4]} intensity={1.5} castShadow />
        <directionalLight position={[-8, -8, -4]} intensity={0.4} color={waterColor} />
        
        {/* Synthetic Environment to avoid CDN fetch failures (CORS/AdBlock on potsdamer_platz_1k.hdr) */}
        <Environment resolution={256} background={false}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer form="ring" intensity={1} color="white" scale={[10, 10, 1]} target={[0, 0, 0]} />
            <Lightformer form="rect" intensity={0.5} color="white" position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer form="rect" intensity={1} color="white" position={[10, 5, 0]} scale={[10, 10, 1]} />
          </group>
        </Environment>

        {/* Smooth Cinematic Camera Rigging */}
        <CameraController activeComponent={activeComponent} controlsRef={controlsRef} />

        {/* Loader wrapped inside ErrorBoundary to fallback to gorgeous procedural models if asset missing */}
        <GLTFErrorBoundary fallback={<ProceduralFallback category={category} />}>
          <React.Suspense fallback={null}>
            <GLTFLoaderComponent category={category} />
          </React.Suspense>
        </GLTFErrorBoundary>

        {/* Soft floor shadow */}
        <ContactShadows 
          position={[0, -2.4, 0]} 
          opacity={0.3} 
          scale={10} 
          blur={1.8} 
          far={3} 
        />

        <OrbitControls 
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={12}
          autoRotate={false}
        />

        {/* Post-Processing effects stack */}
        <EffectComposer multisampling={0}>
          <SSAO 
            intensity={1.2} 
            radius={0.4} 
            luminanceInfluence={0.6} 
          />
          <Bloom 
            luminanceThreshold={0.55} 
            luminanceSmoothing={0.85} 
            intensity={1.0} 
          />
          <SMAA />
        </EffectComposer>
      </Canvas>
    </div>
  );
}


