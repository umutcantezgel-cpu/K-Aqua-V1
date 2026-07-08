// components/globe/LanguageGlobe.tsx
// K-Aqua Language Switch Module — 3D-Globus via @react-three/fiber.
// Kugel mit dynamischer CanvasTexture (MapPainter), Fresnel-Atmosphäre,
// Drag mit Trägheit, Autorotation, flyTo (kürzester Weg), Raycast-Hover/
// Klick → Sprach-Hit-Test, Anker-Projektion in Screen-Koordinaten für das
// spatial mitlaufende Bestätigungs-Panel (anchorOut-Ref, 60fps ohne React).
'use client';

import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState,
} from 'react';
import { LANGUAGES, LANGUAGE_INDEX_BY_ID } from '@/lib/i18n/languages';
import {
  MapPainter, WorldData, latLonToVec3, loadWorld, pickLanguageAt,
} from './geo';

export interface GlobeAnchor { x: number; y: number; visible: boolean; ok: boolean }
export interface GlobeHandle { flyTo(id: string): void }

export interface LanguageGlobeProps {
  dark: boolean;
  tint?: number;
  glow?: number;
  autorotate?: boolean;
  /** Autorotation in Grad/Sekunde */
  speed?: number;
  pendingId: string | null;
  activeId: string | null;
  onSelect(id: string | null): void;
  onHover?(id: string | null, clientX: number, clientY: number): void;
  onReady?(): void;
  onError?(): void;
  /** Wird jeden Frame mit der Screen-Position des Pending-Ankers befüllt */
  anchorOut: React.MutableRefObject<GlobeAnchor>;
  dataUrl?: string;
}

const PITCH_MAX = (68 * Math.PI) / 180;
const wrapPi = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

interface FlyReq { id: string; stamp: number }

function Scene({
  world, propsRef, flyReqRef,
}: {
  world: WorldData;
  propsRef: React.MutableRefObject<LanguageGlobeProps>;
  flyReqRef: React.MutableRefObject<FlyReq | null>;
}) {
  const { gl, camera, size } = useThree();
  const pitchRef = useRef<THREE.Group>(null!);
  const yawRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  const painter = useMemo(() => new MapPainter(world), [world]);
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(painter.canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, [painter]);

  const st = useRef({
    heats: new Float32Array(LANGUAGES.length),
    roles: new Int8Array(LANGUAGES.length),
    hoverIdx: -1,
    down: null as { x: number; y: number; t: number } | null,
    dragging: false,
    vel: 0, velY: 0, idle: 0,
    fly: null as null | { fromY: number; fromX: number; dY: number; dX: number; t0: number; dur: number },
    flyStamp: 0,
    pendingHover: null as null | { x: number; y: number },
    lastPaintKey: '',
    reduced: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }).current;

  const ray = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const tmpV = useMemo(() => new THREE.Vector3(), []);

  /* Raycast → lat/lon auf der Kugel (lokal, Rotation herausgerechnet) */
  const hitLatLon = (clientX: number, clientY: number): [number, number] | null => {
    const rect = gl.domElement.getBoundingClientRect();
    ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObject(meshRef.current, false)[0];
    if (!hit) return null;
    const p = meshRef.current.worldToLocal(hit.point.clone()).normalize();
    const lat = 90 - (Math.acos(clamp(p.y, -1, 1)) * 180) / Math.PI;
    let lon = (Math.atan2(p.z, -p.x) * 180) / Math.PI - 180;
    if (lon < -180) lon += 360;
    return [lat, lon];
  };

  /* Anker einer Sprache → Screen-Pixel (CSS) */
  const anchorScreen = (li: number): { x: number; y: number; visible: boolean } => {
    const [ax, ay, az] = latLonToVec3(LANGUAGES[li].anchor[1], LANGUAGES[li].anchor[0], 1);
    tmpV.set(ax, ay, az).applyMatrix4(meshRef.current.matrixWorld);
    const visible = tmpV.z > 0.18;
    tmpV.project(camera);
    return { x: (tmpV.x * 0.5 + 0.5) * size.width, y: (-tmpV.y * 0.5 + 0.5) * size.height, visible };
  };

  /* Pointer-Interaktion nativ auf dem WebGL-Canvas */
  useEffect(() => {
    const el = gl.domElement;
    el.style.touchAction = 'none';

    const onDown = (e: PointerEvent) => {
      el.setPointerCapture?.(e.pointerId);
      st.down = { x: e.clientX, y: e.clientY, t: performance.now() };
      st.dragging = false;
      st.fly = null;
      st.vel = st.velY = 0;
      st.idle = 0;
    };
    const onMove = (e: PointerEvent) => {
      st.idle = 0;
      if (st.down) {
        const dx = e.clientX - st.down.x;
        const dy = e.clientY - st.down.y;
        if (!st.dragging && dx * dx + dy * dy > 16) {
          st.dragging = true;
          st.hoverIdx = -1;
          propsRef.current.onHover?.(null, e.clientX, e.clientY);
        }
        if (st.dragging) {
          const sens = 0.0052;
          yawRef.current.rotation.y += dx * sens;
          pitchRef.current.rotation.x = clamp(pitchRef.current.rotation.x + dy * sens, -PITCH_MAX, PITCH_MAX);
          st.vel = st.vel * 0.5 + dx * sens * 0.5;
          st.velY = st.velY * 0.5 + dy * sens * 0.5;
          st.down.x = e.clientX;
          st.down.y = e.clientY;
        }
      } else if (e.pointerType === 'mouse') {
        st.pendingHover = { x: e.clientX, y: e.clientY };
      }
    };
    const onUp = (e: PointerEvent) => {
      const wasDrag = st.dragging;
      st.dragging = false;
      if (st.down && !wasDrag && performance.now() - st.down.t < 600) {
        const ll = hitLatLon(e.clientX, e.clientY);
        let li = ll ? pickLanguageAt(world, ll[0], ll[1]) : -1;
        if (li < 0) {
          /* Toleranz für Kleinstaaten: nächster sichtbarer Anker < 22 px */
          let best = -1; let bd = 22 * 22;
          const rect = el.getBoundingClientRect();
          for (let i = 0; i < LANGUAGES.length; i++) {
            const s = anchorScreen(i);
            if (!s.visible) continue;
            const ddx = s.x - (e.clientX - rect.left);
            const ddy = s.y - (e.clientY - rect.top);
            const d = ddx * ddx + ddy * ddy;
            if (d < bd) { bd = d; best = i; }
          }
          li = best;
        }
        propsRef.current.onSelect(li >= 0 ? LANGUAGES[li].id : null);
      }
      st.down = null;
    };
    const onLeave = () => {
      st.pendingHover = null;
      if (st.hoverIdx !== -1) {
        st.hoverIdx = -1;
        propsRef.current.onHover?.(null, 0, 0);
      }
      if (!st.dragging) st.down = null;
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onLeave);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onLeave);
      el.removeEventListener('pointerleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, world]);

  useFrame((_, dtRaw) => {
    const dt = Math.min(0.05, dtRaw);
    const p = propsRef.current;
    const pendIdx = p.pendingId ? LANGUAGE_INDEX_BY_ID[p.pendingId] ?? -1 : -1;
    const actIdx = p.activeId ? LANGUAGE_INDEX_BY_ID[p.activeId] ?? -1 : -1;

    /* Hover-Hit-Test (auf Frame gedrosselt) */
    if (st.pendingHover && !st.dragging) {
      const { x, y } = st.pendingHover;
      st.pendingHover = null;
      const ll = hitLatLon(x, y);
      const li = ll ? pickLanguageAt(world, ll[0], ll[1]) : -1;
      if (li !== st.hoverIdx) st.hoverIdx = li;
      p.onHover?.(li >= 0 ? LANGUAGES[li].id : null, x, y);
      gl.domElement.style.cursor = li >= 0 ? 'pointer' : 'grab';
    }
    if (st.dragging) gl.domElement.style.cursor = 'grabbing';

    /* flyTo-Anfrage übernehmen */
    const req = flyReqRef.current;
    if (req && req.stamp !== st.flyStamp) {
      st.flyStamp = req.stamp;
      const li = LANGUAGE_INDEX_BY_ID[req.id];
      if (li != null) {
        const v = latLonToVec3(LANGUAGES[li].anchor[1], LANGUAGES[li].anchor[0], 1);
        const targetY = -Math.atan2(v[0], v[2]);
        const targetX = clamp((LANGUAGES[li].anchor[1] * Math.PI) / 180, -PITCH_MAX, PITCH_MAX);
        const dY = wrapPi(targetY - yawRef.current.rotation.y);
        const dX = targetX - pitchRef.current.rotation.x;
        if (st.reduced) {
          yawRef.current.rotation.y += dY;
          pitchRef.current.rotation.x = targetX;
        } else {
          const dist = Math.abs(dY) + Math.abs(dX);
          st.fly = {
            fromY: yawRef.current.rotation.y, fromX: pitchRef.current.rotation.x,
            dY, dX, t0: performance.now(),
            dur: clamp(700 + dist * 320, 700, 1500),
          };
        }
        st.vel = st.velY = 0;
      }
    }

    /* flyTo-Animation */
    if (st.fly) {
      const k = clamp((performance.now() - st.fly.t0) / st.fly.dur, 0, 1);
      const e = easeInOut(k);
      yawRef.current.rotation.y = st.fly.fromY + st.fly.dY * e;
      pitchRef.current.rotation.x = st.fly.fromX + st.fly.dX * e;
      if (k >= 1) st.fly = null;
    }

    /* Trägheit */
    if (!st.dragging && !st.fly && (Math.abs(st.vel) > 0.0004 || Math.abs(st.velY) > 0.0004)) {
      yawRef.current.rotation.y += st.vel;
      pitchRef.current.rotation.x = clamp(pitchRef.current.rotation.x + st.velY, -PITCH_MAX, PITCH_MAX);
      const dec = Math.exp(-dt * 2.4);
      st.vel *= dec; st.velY *= dec;
    }

    /* Autorotation nach Inaktivität */
    st.idle += dt;
    if (p.autorotate !== false && !st.reduced && !st.dragging && !st.fly &&
        pendIdx < 0 && st.hoverIdx < 0 && st.idle > 3) {
      yawRef.current.rotation.y += ((p.speed ?? 2) * Math.PI / 180) * dt;
    }

    /* Heat-Animation + Repaint nur bei Änderung */
    st.roles.fill(1);
    if (actIdx >= 0) st.roles[actIdx] = 1;
    if (pendIdx >= 0) st.roles[pendIdx] = 2;
    if (st.hoverIdx >= 0) st.roles[st.hoverIdx] = 3;
    let heatMoving = false;
    const f = 1 - Math.exp(-dt * (st.reduced ? 60 : 9));
    for (let i = 0; i < st.heats.length; i++) {
      const target = i === st.hoverIdx ? 1 : i === pendIdx ? 0.9 : i === actIdx ? 0.6 : 0;
      const d = target - st.heats[i];
      if (Math.abs(d) > 0.003) { st.heats[i] += d * f; heatMoving = true; }
    }
    const hot = st.hoverIdx >= 0 ? st.hoverIdx : pendIdx >= 0 ? pendIdx : actIdx;
    const key = `${p.dark}|${p.tint}|${p.glow}|${hot}|${pendIdx}|${actIdx}`;
    if (heatMoving || key !== st.lastPaintKey) {
      st.lastPaintKey = key;
      const markers: { lonlat: [number, number]; color: string }[] = [];
      const mIdx = pendIdx >= 0 ? pendIdx : actIdx;
      if (mIdx >= 0) {
        markers.push({
          lonlat: LANGUAGES[mIdx].anchor,
          color: p.dark ? LANGUAGES[mIdx].bright : LANGUAGES[mIdx].color,
        });
      }
      painter.paint(st.heats, st.roles, {
        dark: p.dark, tint: p.tint ?? 0.1, glow: p.glow ?? 0.55, hotIndex: hot, markers,
      });
      texture.needsUpdate = true;
    }

    /* Anker-Projektion für das Panel */
    if (pendIdx >= 0) {
      const s = anchorScreen(pendIdx);
      p.anchorOut.current = { x: s.x, y: s.y, visible: s.visible, ok: true };
    } else {
      p.anchorOut.current.ok = false;
    }
  });

  const atmoMat = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uColor: { value: new THREE.Color('#6fc3dd') },
      uIntensity: { value: 0.5 },
    },
    vertexShader: `
      varying vec3 vN; varying vec3 vP;
      void main() {
        vN = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vP = mv.xyz;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uIntensity;
      varying vec3 vN; varying vec3 vP;
      void main() {
        float f = pow(1.0 - abs(dot(normalize(vN), normalize(-vP))), 3.0);
        gl_FragColor = vec4(uColor, f * uIntensity);
      }`,
  }), []);

  useEffect(() => {
    (atmoMat.uniforms.uColor.value as THREE.Color).set(
      propsRef.current.dark ? '#4aa8c9' : '#6fc3dd',
    );
    atmoMat.uniforms.uIntensity.value = propsRef.current.dark ? 0.62 : 0.5;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsRef.current.dark, atmoMat]);

  return (
    <>
      <ambientLight intensity={1.05}></ambientLight>
      <directionalLight position={[2.5, 2, 3]} intensity={0.7}></directionalLight>
      <group ref={pitchRef} rotation={[0.56, 0, 0]}>
        <group ref={yawRef} rotation={[0, 0.21, 0]}>
          <mesh ref={meshRef}>
            <sphereGeometry args={[1, 96, 64]}></sphereGeometry>
            <meshStandardMaterial map={texture} roughness={0.85} metalness={0}></meshStandardMaterial>
          </mesh>
        </group>
      </group>
      <mesh material={atmoMat}>
        <sphereGeometry args={[1.12, 64, 48]}></sphereGeometry>
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */

export const LanguageGlobe = forwardRef<GlobeHandle, LanguageGlobeProps>(
  function LanguageGlobe(props, ref) {
    const [world, setWorld] = useState<WorldData | null>(null);
    const propsRef = useRef(props);
    propsRef.current = props;
    const flyReqRef = useRef<FlyReq | null>(null);

    useImperativeHandle(ref, () => ({
      flyTo(id: string) {
        flyReqRef.current = { id, stamp: (flyReqRef.current?.stamp ?? 0) + 1 };
      },
    }), []);

    useEffect(() => {
      let alive = true;
      loadWorld(props.dataUrl)
        .then((w) => { if (alive) { setWorld(w); propsRef.current.onReady?.(); } })
        .catch(() => { if (alive) propsRef.current.onError?.(); });
      return () => { alive = false; };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.dataUrl]);

    return (
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ position: [0, 0, 2.55], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        className="!absolute !inset-0"
      >
        {world && <Scene world={world} propsRef={propsRef} flyReqRef={flyReqRef}></Scene>}
      </Canvas>
    );
  },
);
