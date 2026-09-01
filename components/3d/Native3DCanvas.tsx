/* eslint-disable @typescript-eslint/no-explicit-any, react/jsx-no-literals */
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';
import {
  RotateCw,
  Scissors,
  Ruler,
  Maximize2,
  Minimize2,
  Download,
  RotateCcw,
  Box,
  Layers,
  Sparkles,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { resolve3DProductId } from '@/lib/3d/resolve';

/**
 * Gibt ein Material samt seiner Texturen frei.
 *
 * `material.dispose()` allein reicht nicht: Es löst die Shader-Programme, lässt
 * aber die Texturen im Grafikspeicher stehen. Die 3D-Bibliothek erzeugt je
 * Modell über `noiseTexture()` eine 512×512-`CanvasTexture` als `roughnessMap`
 * (siehe `public/kaqua-3d/lib/kaqua-3d-core.mjs`). Bei jedem Produkt- und
 * Größenwechsel wird das Modell neu gebaut — ohne diese Freigabe sammeln sich
 * die alten Texturen an, und im 3D-Studio, wo man Produkt für Produkt
 * durchsieht, wächst der Speicher stetig.
 *
 * Statt einer festen Liste von Slots werden alle Eigenschaften geprüft: Kommt
 * ein Material mit einer weiteren Map hinzu, ist sie damit automatisch erfasst.
 */
function disposeMaterial(material: any): void {
  if (!material) return;
  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === 'object' && typeof value.dispose === 'function' && value.isTexture) {
      value.dispose();
    }
  }
  material.dispose();
}

/**
 * Beschriftung und Farbfleck der Rohrvarianten.
 *
 * Die Hex-Werte MÜSSEN mit den Rezepten in `kaqua-3d/core/materials.js`
 * übereinstimmen — sonst zeigt der Wähler eine andere Farbe als das Modell
 * daneben, und das fällt sofort auf.
 *
 * Grün trägt bewusst keine RAL-Nummer im Namen: RAL 6024 ist die Norm des
 * Granulats, der hier gezeigte Wert ist aus den Herstelleraufnahmen gemessen
 * und beschreibt das fertige Bauteil. Die drei Sonderfarben folgen dagegen
 * direkt der RAL-Angabe aus dem Marketing-Archiv.
 */
const VARIANT_LABEL: Record<string, { name: string; hex: string }> = {
  gruen: { name: 'Grün (Standard)', hex: '#32A175' },
  blau: { name: 'Blau (RAL 5005)', hex: '#005387' },
  curry: { name: 'Curry (RAL 1002)', hex: '#C6A664' },
  mocca: { name: 'Mocca (RAL 7032)', hex: '#B9B9A8' },
};

/* Die Linienfarbe der Bemassung.
 *
 * `buildDimLines` faerbt ohne Angabe in Slate-900 — auf dunklem Grund
 * unsichtbar. Gelesen wird direkt aus dem DOM statt ueber `useTheme`, weil
 * `buildCurrentModel` ein `useCallback([])` ist: ein Hook-Wert waere dort
 * eingefroren. `next-themes` schreibt das Attribut auf <html>. */
function massFarbe(): number {
  if (typeof document === 'undefined') return 0x0f172a;
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 0xe2e8f0 : 0x0f172a;
}

/* Tiefgestellte Ziffern auf ASCII zurueckfuehren.
 *
 * `elbow-90-male-thread` beschriftet sein Mass mit „z₁", sein DIMENSION_KEY
 * fuehrt aber „z1". Ohne diese Normalisierung liefe genau dort das
 * Nachschlagen ins Leere und der Klartextname fehlte. */
const TIEFZAHL: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
  '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
};

/** Der sprechende Name zu einem Masskuerzel, aus `product.dimensionKey`. */
function massName(product: any, label: string): string | null {
  const schluessel = product?.dimensionKey;
  if (!schluessel || typeof label !== 'string') return null;

  const ascii = [...label].map((c) => TIEFZAHL[c] ?? c).join('');
  const direkt = schluessel[label] ?? schluessel[ascii];
  if (direkt) return direkt;

  /* Manche Bauteile leiten ihr Symbol aus dem Klartext ab statt umgekehrt:
     `elbow-90` beschriftet mit `DIMENSION_KEY.leg.split(' ')[1]`, aus
     „Schenkelmaß L" wird also das Label „L", das als Schluessel nirgends
     steht. Diese Suche kehrt genau das um — sie vergleicht das Label mit dem
     letzten Wort der Klartextnamen. */
  for (const wert of Object.values(schluessel)) {
    if (typeof wert !== 'string') continue;
    const letztes = wert.trim().split(/\s+/).pop();
    if (letztes === label || letztes === ascii) return wert;
  }
  return null;
}

export interface Native3DCanvasProps {
  productId?: string; // e.g. "fittings/socket", "pipes/k-pipe-pp-r-sdr-6", "valves/pp-r-ball-valve-ball-in-pp"
  slug?: string;
  category?: string;
  initialSize?: number;
  onSizeChange?: (size: number) => void;
  onProductChange?: (product: any) => void;
  className?: string;
  heightClass?: string;
  showControls?: boolean;
  showSizeSelector?: boolean;
  autoRotateDefault?: boolean;
  basePath?: string;
}


// `resolve3DProductId` liegt jetzt in `lib/3d/resolve.ts` und wird hier nur
// re-exportiert, damit bestehende Importe weiter funktionieren. Wer die
// Funktion allein braucht, sollte direkt aus `lib/3d/resolve` importieren —
// sonst zieht er three.js mit ins Bundle.
export { resolve3DProductId };

export default function Native3DCanvas({
  productId,
  slug,
  category,
  initialSize,
  onSizeChange,
  onProductChange,
  className,
  heightClass = 'h-[440px] sm:h-[520px] lg:h-[600px]',
  showControls = true,
  showSizeSelector = true,
  autoRotateDefault = true,
  basePath = '/kaqua-3d',
}: Native3DCanvasProps) {
  const t = useTranslations('viewer3d');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const clipPlaneRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, 0, -1), 0));
  const activeProductModuleRef = useRef<any>(null);

  /* Bemassung.
   *
   * `dimBauerRef` haelt `buildDimLines` aus dem GELADENEN Produktmodul, nicht
   * aus einem eigenen Import. Das ist keine Bequemlichkeit, sondern Pflicht:
   * diese Datei bindet `three` gebuendelt aus node_modules ein, die
   * Produktmodule loesen ihr `'three'` zur Laufzeit ueber die Import-Map in
   * app/[locale]/layout.tsx nach /kaqua-3d/vendor/three.module.js auf. Das
   * sind zwei getrennte Bibliotheksinstanzen. Ein statischer Import von
   * `buildDimLines` zoege eine dritte Kopie ins Bundle und liesse die
   * `Vector3`-Objekte aus den Massangaben auf fremde Geometrieklassen
   * treffen.
   *
   * `showDimensionsRef` spiegelt den Zustand, weil `buildCurrentModel` ein
   * `useCallback([])` ist und den Zustand sonst nicht sehen kann — die Linien
   * waeren nach jedem Groessenwechsel wieder aus, obwohl der Knopf aktiv
   * aussieht. */
  const dimLinesRef = useRef<{
    group: THREE.Group;
    entries: Array<{ label: string; value: number; unit: string }>;
    materials: THREE.Material[];
  } | null>(null);
  const dimBauerRef = useRef<((specs: unknown[], opt?: unknown) => any) | null>(null);
  const showDimensionsRef = useRef(false);

  /* Der Kameraabstand aus der ERSTEN Rahmung.
   *
   * `handleResetCamera` hat die Huellbox bisher neu vermessen. Sobald die
   * Massgruppe im Baum haengt, misst es sie mit — `Box3.expandByObject`
   * prueft `visible` nicht (three.core.js) —, und „Zuruecksetzen" landete auf
   * einem anderen Ausschnitt als die Erstansicht. */
  const rahmenAbstandRef = useRef(0.12);

  /* Merkt, dass die Grafikausgabe selbst ausgefallen ist.
   *
   * Warum ein Ref und nicht der `error`-Zustand allein: der Ladeeffekt weiter
   * unten beginnt jeden Lauf mit `setError(null)` — er raeumt die Anzeige auf,
   * bevor er ein Modul holt. Ein im Aufbaueffekt gesetzter Fehler waere damit
   * sofort wieder weg, und weil das Modul selbst problemlos laedt (dafuer
   * braucht es kein WebGL), endete alles bei `error: null, loading: false`:
   * kein Modell, keine Ladeanzeige, keine Meldung — ein stummer leerer Kasten.
   * Genau das war zu sehen. Ein Ref ueberlebt den Aufraeumschritt. */
  const grafikAusgefallenRef = useRef(false);

  /* Vollbild: erst die Browser-Schnittstelle, dann der Rueckfall.
   *
   * WARUM NICHT NUR `fixed inset-0`. Genau das war es vorher, und ein
   * nachgebautes Vollbild aus `position: fixed` steht und faellt mit den
   * Vorfahren: sobald einer davon `transform`, `filter` oder
   * `will-change: transform` traegt, spannt er einen eigenen Bezugsrahmen
   * auf, und `fixed` bezieht sich nicht mehr auf das Sichtfenster. Dieser
   * Viewer sitzt auf den Produktseiten in einem <Reveal>, dessen
   * Motion-Wrapper bis zum Ende seiner Einblendung `translateY(22px)`
   * traegt — in diesem Fenster ist das Vollbild nachweislich verschoben.
   * Danach setzt Motion den Transform auf `none` zurueck, die Lage ist also
   * nicht dauerhaft falsch, aber sie haengt an fremdem Verhalten.
   *
   * Die Browser-Schnittstelle legt das Element stattdessen in die oberste
   * Ebene. Die ignoriert Bezugsrahmen vollstaendig, verschiebt das Element
   * aber NICHT im DOM — die Leinwand behaelt ihren WebGL-Kontext, und
   * nichts wird neu aufgebaut. Ausserdem kuemmert sich der Browser um
   * Escape und um einen deckenden Hintergrund.
   *
   * `istEchtesVollbild` unterscheidet beide Wege: nur der Rueckfall braucht
   * die eigenen Vollbildklassen. */
  const [istEchtesVollbild, setIstEchtesVollbild] = useState(false);

  /* Der Wiederaufbau nach einer Kontextrueckkehr, immer auf dem neuesten Stand.
   *
   * Der Aufbaueffekt laeuft einmal; sein Zuhoerer fuer `webglcontextrestored`
   * lebt danach weiter. Griffe er direkt auf `selectedSize` und `isSection`
   * zu, haette er die Werte vom Zeitpunkt des Effektlaufs eingeschlossen —
   * nach einem Groessenwechsel wuerde also die ALTE Nennweite wieder
   * aufgebaut. Der Verweis wird bei jeder Aenderung nachgezogen; der Zuhoerer
   * ruft nur ihn. */
  const neuAufbauenRef = useRef<() => void>(() => {});
  const currentAssemblyRef = useRef<any>(null);

  // States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productData, setProductData] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<number>(initialSize || 32);
  const [availableSizes, setAvailableSizes] = useState<number[]>([]);
  /* Farbvariante. Der Produktvertrag sieht sie seit jeher als zweiten
     Parameter von build(size, variant, clipPlane) vor; hier stand bisher
     hart `null`, und kein Produkt fuellte `variants`. Beides ist jetzt
     angeschlossen — die Rohrserien sind neben Gruen auch in Blau, Curry und
     Mocca lieferbar. */
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [availableVariants, setAvailableVariants] = useState<string[]>([]);
  const [isAutoRotate, setIsAutoRotate] = useState(autoRotateDefault);
  const [isSection, setIsSection] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [dimensionsList, setDimensionsList] = useState<
    Array<{ label: string; name: string | null; value: number | string; unit: string }>
  >([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [exporting, setExporting] = useState(false);

  /* Die Masslinien folgen dem Knopf. Der Ref laeuft mit, damit ein spaeterer
     Modellaufbau den Zustand kennt (siehe `showDimensionsRef`). */
  useEffect(() => {
    showDimensionsRef.current = showDimensions;
    const linien = dimLinesRef.current;
    if (linien) linien.group.visible = showDimensions;
  }, [showDimensions]);

  /* Beim Wechsel zwischen hell und dunkel die Linienfarbe nachziehen.
     Beobachtet wird das Attribut, das `next-themes` auf <html> schreibt —
     ohne Abhaengigkeit vom Theme-Kontext, damit die Ansicht auch ausserhalb
     des Providers (Tests, Einzeleinbindung) nicht bricht. */
  useEffect(() => {
    const nachziehen = () => {
      const linien = dimLinesRef.current;
      if (!linien) return;
      const farbe = massFarbe();
      linien.materials.forEach((m: any) => {
        if (m.color) m.color.setHex(farbe);
      });
    };
    const beobachter = new MutationObserver(nachziehen);
    beobachter.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => beobachter.disconnect();
  }, []);

  // Effective product ID to load
  const effectiveId = productId || resolve3DProductId(slug || category);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera (35deg FOV for realistic isometric CAD inspection)
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.01, 100);
    camera.position.set(0.2, 0.18, 0.28);
    cameraRef.current = camera;

    /* 3. Renderer.
     *
     * WARUM HIER GEPRUEFT WIRD. three.js verlangt seit r163 WebGL 2; die
     * Unterstuetzung fuer WebGL 1 ist entfernt. Fehlt sie auf dem Geraet,
     * wirft `new THREE.WebGLRenderer(...)` — und zwar mitten in diesem
     * Effekt. Ohne Absicherung bricht er an dieser Stelle ab: es entstehen
     * keine Steuerung, keine Animationsschleife und kein Modell-Ladevorgang.
     * `loading` bliebe damit fuer immer `true` und `error` leer, und der
     * Besucher saehe dauerhaft einen leeren Kasten mit Ladeanzeige — ohne
     * jeden Hinweis, woran es liegt.
     *
     * Genau so trat es auf: auf dem Notebook lief die Ansicht, auf einem
     * Surface und auf Mobilgeraeten nicht. Solche Geraete melden haeufig gar
     * kein WebGL 2 — bei abgeschalteter Hardwarebeschleunigung, unter
     * strengen Datenschutzeinstellungen, im Energiesparmodus oder schlicht,
     * weil zu viele WebGL-Kontexte offen sind.
     *
     * Jetzt wird geprueft und gefangen. Faellt es aus, greift die schon
     * vorhandene Fehleranzeige weiter unten: sie nennt das Modell als nicht
     * verfuegbar und verweist auf die Maßtabelle, die ohnehin auf der Seite
     * steht. Das ist die ehrliche Auskunft statt einer ewigen Ladeanzeige.
     */
    const kannWebGl2 = (() => {
      try {
        return !!document.createElement('canvas').getContext('webgl2');
      } catch {
        return false;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      if (!kannWebGl2) throw new Error('WebGL 2 nicht verfügbar');
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      grafikAusgefallenRef.current = false;
    } catch {
      grafikAusgefallenRef.current = true;
      setError('WebGL 2');
      setLoading(false);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.localClippingEnabled = true;
    rendererRef.current = renderer;

    // 4. OrbitControls with smooth damping
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 0.04;
    controls.maxDistance = 2.0;
    controls.autoRotate = autoRotateDefault;
    controls.autoRotateSpeed = 1.2;
    controls.enablePan = true;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 5. Lighting Setup (Neutral Studio Rig)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.2);
    hemiLight.position.set(0, 5, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(1.5, 2.5, 2.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.75);
    fillLight.position.set(-2.0, -0.5, -1.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.1);
    rimLight.position.set(0, 2.0, -3.0);
    scene.add(rimLight);

    // 6. CAD Floor Grid
    const grid = new THREE.GridHelper(0.5, 20, 0x0284c7, 0x334155);
    grid.position.y = -0.05;
    (grid.material as THREE.Material).opacity = 0.18;
    (grid.material as THREE.Material).transparent = true;
    scene.add(grid);

    /* Renderschleife — laeuft nur, wenn der Viewer wirklich zu sehen ist.
       Vorher lief sie ab dem Mounten dauerhaft weiter: auch wenn der Viewer
       laengst aus dem Bild gescrollt war und auch, wenn der Tab im Hintergrund
       lag. Auf einer Produktseite steht er unterhalb des ersten Bildschirms —
       er hat also in der Regel gerechnet, ohne dass jemand hinsah. Das kostet
       auf Notebooks spuerbar Akku und auf schwachen Geraeten die Bildrate der
       ganzen Seite. */
    let isRunning = false;
    let imBild = false;
    let tabSichtbar = document.visibilityState !== 'hidden';

    const animate = () => {
      if (!isRunning) return;
      controls.update();
      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    const laufZustandPruefen = () => {
      const sollLaufen = imBild && tabSichtbar;
      if (sollLaufen === isRunning) return;
      isRunning = sollLaufen;
      if (sollLaufen) {
        animate();
      } else if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };

    /* Ein einzelnes Standbild, damit der Viewer auch im pausierten Zustand
       etwas zeigt statt einer leeren Flaeche. */
    renderer.render(scene, camera);

    /* Verlust des Grafikkontexts abfangen.
     *
     * Der zweite Weg, auf dem die Ansicht auf Mobilgeraeten verschwindet.
     * Der Browser zieht einer Seite den WebGL-Kontext weg, wenn der Speicher
     * knapp wird oder zu viele Kontexte offen sind — auf Telefonen und
     * Tablets deutlich frueher als auf einem Notebook. Die schwersten
     * Modelle hier haben bis zu 190 000 Dreiecke.
     *
     * Ohne Behandlung passiert dann nichts Sichtbares: die Leinwand bleibt
     * beim letzten Bild stehen oder wird weiss, die Animationsschleife laeuft
     * ins Leere weiter. `preventDefault()` ist Vorschrift, sonst versucht der
     * Browser keine Wiederherstellung. Bekommt er den Kontext zurueck, wird
     * das Modell neu gebaut; bleibt er weg, erscheint die Fehleranzeige. */
    const aufKontextVerlust = (e: Event) => {
      e.preventDefault();
      isRunning = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      grafikAusgefallenRef.current = true;
      setError('WebGL');
      setLoading(false);
    };
    const aufKontextRueckkehr = () => {
      grafikAusgefallenRef.current = false;
      setError(null);
      neuAufbauenRef.current();
      laufZustandPruefen();
    };
    canvas.addEventListener('webglcontextlost', aufKontextVerlust, false);
    canvas.addEventListener('webglcontextrestored', aufKontextRueckkehr, false);

    const sichtbarkeit = new IntersectionObserver(
      (eintraege) => {
        imBild = eintraege.some((e) => e.isIntersecting);
        laufZustandPruefen();
      },
      { rootMargin: '200px' }
    );
    sichtbarkeit.observe(container);

    const aufTabWechsel = () => {
      tabSichtbar = document.visibilityState !== 'hidden';
      laufZustandPruefen();
    };
    document.addEventListener('visibilitychange', aufTabWechsel);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      sichtbarkeit.disconnect();
      document.removeEventListener('visibilitychange', aufTabWechsel);
      canvas.removeEventListener('webglcontextlost', aufKontextVerlust);
      canvas.removeEventListener('webglcontextrestored', aufKontextRueckkehr);
      resizeObserver.disconnect();
      controls.dispose();
      // `scene.clear()` trennt die Kinder nur vom Baum — Geometrien, Materialien
      // und Texturen des zuletzt gezeigten Modells blieben im Grafikspeicher
      // stehen. Beim Verlassen einer Produktseite ist das genau der Moment, in
      // dem sie freigegeben gehören.
      scene.traverse((child: any) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((m: any) => disposeMaterial(m));
        }
      });
      scene.clear();
      /* Nur `dispose()`, KEIN `forceContextLoss()`.
         Naheliegend waere es, den WebGL-Kontext hier aktiv herzugeben — ihre
         Zahl ist begrenzt. Hier ist es falsch: der Renderer haengt am
         <canvas>, das React ueber Effektlaeufe hinweg WIEDERVERWENDET.
         `forceContextLoss()` toetet den Kontext dieses Elements dauerhaft;
         der naechste Effektlauf (in der Entwicklung schon durch StrictMode,
         in Produktion beim Wechsel von `autoRotateDefault`) baut dann einen
         Renderer auf einem toten Kontext und stirbt an
         `capabilities.precision === null`. Getestet: die Produktseite zeigte
         danach nur noch „Die 3D-Ansicht konnte nicht geladen werden."
         `dispose()` gibt die GPU-Ressourcen ohnehin frei; der Kontext wird
         mit dem Canvas eingesammelt. */
      renderer.dispose();
    };
  }, [autoRotateDefault]);

  // Load Product Geometry from Library
  const buildCurrentModel = useCallback(
    (product: any, size: number, sectionActive: boolean, variant: string | null = null) => {
      /* Ganz vorn, VOR dem Waechter: sonst bliebe beim frueh abgebrochenen
         Lauf die Massliste des vorigen Modells stehen und behauptete Werte,
         die zum angezeigten Bauteil nicht gehoeren. */
      setDimensionsList((vorher) => (vorher.length ? [] : vorher));

      const scene = sceneRef.current;
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!scene || !product || typeof product.build !== 'function') return;

      // Dispose existing model group
      if (currentGroupRef.current) {
        scene.remove(currentGroupRef.current);
        currentGroupRef.current.traverse((child: any) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((m: any) => disposeMaterial(m));
          }
        });
        currentGroupRef.current = null;
        // Die Massgruppe haengt unter `assembly.root` und wurde vom traverse
        // oben mit freigegeben; hier nur noch die Spur loeschen.
        dimLinesRef.current = null;
      }

      try {
        const clip = sectionActive ? clipPlaneRef.current : null;
        const assembly = product.build(size, variant, clip);
        currentAssemblyRef.current = assembly;

        // Apply Halbschnitt clipping plane and make cut caps visible if section is active
        if (typeof assembly.setSection === 'function') {
          assembly.setSection(sectionActive, clipPlaneRef.current);
        }

        // mm to meters scaling
        const holder = new THREE.Group();
        holder.name = `k_aqua_${product.id}_d${size}`;
        holder.scale.setScalar(0.001);
        holder.add(assembly.root);

        // Center geometry
        const box = new THREE.Box3().setFromObject(holder);
        const center = box.getCenter(new THREE.Vector3());
        const sizeVec = box.getSize(new THREE.Vector3());
        holder.position.sub(center);

        scene.add(holder);
        currentGroupRef.current = holder;

        // Auto-frame camera based on bounding radius
        const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
        const distance = Math.max(0.12, maxDim * 2.8);
        rahmenAbstandRef.current = distance;
        if (camera && controls) {
          camera.position.set(distance * 0.7, distance * 0.55, distance * 0.85);
          controls.target.set(0, 0, 0);
          // 0.35 statt 0.5: rund 30 % mehr Zoom nach innen. Die untere
          // Schranke haelt Abstand zur Near-Plane 0.01, sonst schneidet die
          // Kamera ins Bauteil.
          controls.minDistance = Math.max(0.02, maxDim * 0.35);
          controls.maxDistance = maxDim * 8.0;
          controls.update();
        }

        /* Bemassung — ERST HIER, nach der Kamerarahmung.
         *
         * `Box3.expandByObject` prueft `visible` nicht. Haenge ich die
         * Massgruppe frueher ein, bestimmt sie Mittelpunkt, Zustellung und
         * Zoomgrenzen JEDES Modells mit — auch bei abgeschalteter Bemassung.
         *
         * Bisher stand hier nur eine Textliste: `label` und `value` wurden
         * uebernommen, die Punkte `a`/`b`/`off` weggeworfen. Genau die
         * braucht `buildDimLines`, um echte Masslinien zu zeichnen. Der Knopf
         * hiess „Bemassung" und zeichnete keine. */
        const massAngaben: any[] = Array.isArray(assembly.dims) ? assembly.dims : [];
        if (massAngaben.length) {
          let eintraege: any[] = massAngaben;
          const bauer = dimBauerRef.current;
          if (bauer) {
            try {
              const linien = bauer(massAngaben, {
                // `maxDim` steht in Metern (holder.scale 0.001), buildDimLines
                // rechnet in Millimetern und leitet daraus die Pfeilgroesse ab.
                scale: Math.max(20, maxDim * 1000),
                color: massFarbe(),
              });
              // Der Renderer laeuft mit ACES-Tonwertabbildung und Belichtung
              // 1.15. Die faerbt auch Linien- und Basismaterial um: die dunkle
              // Linie laese sich ausgewaschen, die helle grau.
              linien.materials.forEach((m: any) => {
                m.toneMapped = false;
              });
              linien.group.visible = showDimensionsRef.current;
              // An `assembly.root`, NICHT an die Szene: nur unter dem
              // Modellhalter wird die Gruppe beim naechsten Aufbau
              // mitfreigegeben, sonst leckt sie bei jedem Groessenwechsel.
              assembly.root.add(linien.group);
              dimLinesRef.current = linien;
              eintraege = linien.entries;
            } catch (err) {
              // Eine fehlerhafte Massangabe darf nie das ganze Modell kosten.
              console.error('[3D] Masslinien konnten nicht gebaut werden:', err);
              dimLinesRef.current = null;
            }
          }
          setDimensionsList(
            eintraege.map((e: any) => ({
              label: e.label,
              name: massName(product, e.label),
              value: typeof e.value === 'number' ? Math.round(e.value * 10) / 10 : e.value,
              unit: e.unit ?? 'mm',
            }))
          );
        }
      } catch (err: any) {
        console.error('Error building 3D model:', err);
        setDimensionsList([]);
        dimLinesRef.current = null;
      }
    },
    []
  );

  /* Haelt den Wiederaufbau-Verweis auf dem Stand der aktuellen Anzeige.
     Siehe die Begruendung bei `neuAufbauenRef` weiter oben. */
  useEffect(() => {
    neuAufbauenRef.current = () => {
      if (activeProductModuleRef.current) {
        buildCurrentModel(activeProductModuleRef.current, selectedSize, isSection);
      }
    };
  }, [buildCurrentModel, selectedSize, isSection]);

  /* Vollbild an- und ausschalten. */
  const vollbildUmschalten = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    // Bereits im echten Vollbild? Dann beenden.
    const d = document as Document & { webkitExitFullscreen?: () => Promise<void> };
    const aktuell = document.fullscreenElement ?? null;
    if (aktuell) {
      try {
        await (document.exitFullscreen?.() ?? d.webkitExitFullscreen?.());
      } catch {
        /* Der Zustandswaechter raeumt nach. */
      }
      return;
    }

    if (isFullscreen) {
      // Rueckfall-Vollbild beenden.
      setIsFullscreen(false);
      return;
    }

    type MitWebkit = HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> };
    const mit = el as MitWebkit;
    try {
      await (el.requestFullscreen?.({ navigationUI: 'hide' }) ?? mit.webkitRequestFullscreen?.());
      // `fullscreenchange` setzt den Zustand — nicht hier, sonst laufen
      // Zustand und Wirklichkeit auseinander, wenn der Nutzer mit Escape
      // aussteigt.
    } catch {
      /* iOS Safari kennt Element.requestFullscreen nicht, und manche
         Browser lehnen die Anfrage ab. Dann der Rueckfall — er bedeckt
         wegen des Vorfahren-Transforms nicht zwingend das ganze
         Sichtfenster, ist aber deckend und sperrt das Scrollen. */
      setIsFullscreen(true);
    }
  }, [isFullscreen]);

  /* Der Browser fuehrt beim Vollbild Buch, nicht wir.
     Escape, die F-Taste und der Systemknopf loesen alle `fullscreenchange`
     aus; ohne diesen Waechter zeigte der Knopf danach den falschen Zustand. */
  useEffect(() => {
    /* Nur den Zustand fuehren. Die Leinwand stellt der ResizeObserver
       weiter unten um — er beobachtet denselben Container und feuert beim
       Vollbildwechsel von selbst. */
    const beiWechsel = () => {
      setIstEchtesVollbild(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener('fullscreenchange', beiWechsel);
    document.addEventListener('webkitfullscreenchange', beiWechsel);
    return () => {
      document.removeEventListener('fullscreenchange', beiWechsel);
      document.removeEventListener('webkitfullscreenchange', beiWechsel);
    };
  }, []);

  /* Rueckfall-Vollbild: Seite dahinter sperren und Escape annehmen.
     Beim echten Vollbild macht der Browser beides selbst. */
  useEffect(() => {
    if (!isFullscreen) return;
    /* Ohne diese Sperre scrollt die Seite hinter dem Vollbild weiter. Da
       das Rueckfall-Vollbild an einem transformierten Vorfahren haengt,
       scrollt es mit — die Werkzeugleiste wandert dabei durchs Sichtfeld
       und ist wieder weg, bevor man den Export-Knopf trifft. */
    const vorher = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const beiTaste = (e: KeyboardEvent) => {
      // Erst das offene Menue schliessen, dann das Vollbild verlassen.
      if (e.key === 'Escape' && !exportOpen) setIsFullscreen(false);
    };
    document.addEventListener('keydown', beiTaste);
    return () => {
      document.body.style.overflow = vorher;
      document.removeEventListener('keydown', beiTaste);
    };
  }, [isFullscreen, exportOpen]);

  /* Das Exportmenue schliesst auf Escape und auf einen Klick daneben.
     Ohne das blieb es offen stehen und verdeckte die Ansicht. */
  const exportMenueRef = useRef<HTMLDivElement | null>(null);
  const exportKnopfRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!exportOpen) return;
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExportOpen(false);
    };
    const beiKlick = (e: PointerEvent) => {
      const ziel = e.target;
      if (!(ziel instanceof Node)) return;
      // Knopf und Menue sind seit dem Umbau keine Verwandten mehr; beide
      // muessen einzeln gefragt werden, sonst schliesst der eigene Klick
      // auf den Knopf das Menue sofort wieder.
      if (exportMenueRef.current?.contains(ziel)) return;
      if (exportKnopfRef.current?.contains(ziel)) return;
      setExportOpen(false);
    };
    document.addEventListener('keydown', beiTaste);
    // `pointerdown` deckt Maus und Touch in einem Durchgang ab.
    document.addEventListener('pointerdown', beiKlick);
    return () => {
      document.removeEventListener('keydown', beiTaste);
      document.removeEventListener('pointerdown', beiKlick);
    };
  }, [exportOpen]);

  // Fetch and Mount Product Module
  useEffect(() => {
    let cancelled = false;

    /* Ist die Grafikausgabe ausgefallen, gibt es nichts zu laden: das Modul
       wuerde zwar kommen, aber es waere nichts da, was es zeichnen koennte.
       Die Meldung bleibt stehen, statt vom Aufraeumschritt darunter geloescht
       zu werden. */
    if (grafikAusgefallenRef.current) {
      setError('WebGL 2');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!effectiveId) {
      // Kein Modell hinterlegt — das ist kein Fehler, sondern ein noch offener
      // Produktionsschritt. Wird als eigener Zustand angezeigt, nicht als Panne.
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const mod = await import(/* webpackIgnore: true */ `${basePath}/lib/index.mjs`);
        if (cancelled) return;

        /* Der Masslinien-Bauer kommt aus GENAU diesem Modul — es reicht
           `kaqua-3d-core.mjs` per `export *` durch. Damit stammen Linien und
           Massangaben aus derselben three.js-Instanz. Siehe `dimBauerRef`. */
        dimBauerRef.current = typeof mod.buildDimLines === 'function' ? mod.buildDimLines : null;

        const product = await mod.loadProduct(effectiveId);
        if (cancelled) return;

        activeProductModuleRef.current = product;
        setProductData(product);

        const sizes = product.sizes || [20, 25, 32, 40, 50, 63];
        setAvailableSizes(sizes);

        /* Der Wähler erscheint nur, wenn das Produkt Varianten deklariert —
           genau das Verhalten, das der Produktvertrag für `states` beschreibt
           („Fehlt states, verschwindet der Auf/Zu-Knopf von selbst"). */
        const varianten: string[] = Array.isArray(product.variants) ? product.variants : [];
        setAvailableVariants(varianten);
        setSelectedVariant(varianten[0] ?? null);

        const initialD = sizes.includes(selectedSize) ? selectedSize : product.defaultSize || sizes[0];
        setSelectedSize(initialD);

        if (onProductChange) onProductChange(product);
        if (onSizeChange) onSizeChange(initialD);

        buildCurrentModel(product, initialD, isSection);
        setLoading(false);
      } catch (err: any) {
        if (!cancelled) {
          // "wird vorbereitet" las sich wie ein normaler Zwischenzustand und
          // verdeckte damit echte Ladefehler. Die Modul-ID und der Pfad gehören
          // in die Konsole, sonst ist im Betrieb nicht feststellbar, welches
          // Modell fehlt.
          console.error(
            `[3D] Produktmodul "${effectiveId}" konnte nicht geladen werden (Basis: ${basePath}).`,
            err
          );
          setError(effectiveId);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [effectiveId, basePath, buildCurrentModel, onProductChange, onSizeChange]);

  // Handle Size Switch
  const handleSelectSize = (d: number) => {
    setSelectedSize(d);
    if (onSizeChange) onSizeChange(d);
    if (activeProductModuleRef.current) {
      buildCurrentModel(activeProductModuleRef.current, d, isSection, selectedVariant);
    }
  };

  // Handle Colour Variant Switch
  const handleSelectVariant = (v: string) => {
    setSelectedVariant(v);
    if (activeProductModuleRef.current) {
      buildCurrentModel(activeProductModuleRef.current, selectedSize, isSection, v);
    }
  };

  // Handle Section Cut Toggle
  const handleToggleSection = () => {
    const next = !isSection;
    setIsSection(next);
    if (currentAssemblyRef.current && typeof currentAssemblyRef.current.setSection === 'function') {
      currentAssemblyRef.current.setSection(next, clipPlaneRef.current);
    } else if (activeProductModuleRef.current) {
      buildCurrentModel(activeProductModuleRef.current, selectedSize, next);
    }
  };

  // Handle Wireframe Toggle
  const handleToggleWireframe = () => {
    const next = !isWireframe;
    setIsWireframe(next);
    if (currentGroupRef.current) {
      /* Die Massgruppe haengt mit unter dem Modellhalter, und die
         Pfeilspitzen sind Meshes — `MeshBasicMaterial` nimmt `wireframe`
         an. Ohne diesen Waechter wuerden aus den Masspfeilen Drahtkegel. */
      const massMaterialien = new Set<unknown>(dimLinesRef.current?.materials ?? []);
      currentGroupRef.current.traverse((child: any) => {
        if (!child.material) return;
        const liste = Array.isArray(child.material) ? child.material : [child.material];
        liste.forEach((m: any) => {
          if (!massMaterialien.has(m)) m.wireframe = next;
        });
      });
    }
  };

  // Handle Auto Rotate Toggle
  const handleToggleAutoRotate = () => {
    const next = !isAutoRotate;
    setIsAutoRotate(next);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = next;
    }
  };

  // Reset Camera View
  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current && currentGroupRef.current) {
      /* Der Abstand aus der Erstrahmung statt einer neuen Messung. Die
         Huellbox enthaelt inzwischen die Masslinien, und `expandByObject`
         prueft `visible` nicht — neu gemessen laege „Zuruecksetzen" auf einem
         anderen Ausschnitt als die Erstansicht, je nachdem ob die Bemassung
         irgendwann einmal an war. */
      const distance = rahmenAbstandRef.current;
      cameraRef.current.position.set(distance * 0.7, distance * 0.55, distance * 0.85);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  /**
   * Sucht die Artikelzeile zur angezeigten Groesse.
   *
   * Die meisten Produkte schluesseln ueber die Nennweite `d`; 22 der 50
   * benutzen `sizeKey: 'key'` mit einem zusammengesetzten Schluessel wie
   * `20x1/2`, weil eine Zeile dort erst durch das Maßpaar eindeutig wird.
   */
  const articleForSize = (product: any, size: number | string) => {
    if (!product?.articles) return null;
    const field = product.sizeKey || 'd';
    return (
      product.articles.find((a: any) => String(a[field]) === String(size)) ?? null
    );
  };

  /**
   * Laedt die Datei im Browser herunter.
   *
   * `URL.revokeObjectURL` erst im naechsten Ereignisdurchlauf: Safari bricht
   * den Download ab, wenn die Adresse noch im selben Durchlauf freigegeben
   * wird, in dem der Klick ausgeloest wurde.
   */
  const triggerDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  /**
   * Exportiert das angezeigte Bauteil als GLB oder OBJ.
   *
   * DREI DINGE WAREN HIER FALSCH und sind es jetzt nicht mehr:
   *
   * 1. Exportiert wurde der ANSICHTSZUSTAND — mit aktivem Halbschnitt, wenn
   *    der Nutzer ihn eingeschaltet hatte. Wer sich ein Bauteil aufgeschnitten
   *    ansieht und dann exportiert, bekam ein aufgeschnittenes Bauteil in
   *    seine Planung. Jetzt wird fuer den Export neutral neu gebaut.
   *
   * 2. Das OBJ kam in METERN. Der Exportvertrag des 3D-Bestands
   *    (kaqua-3d/core/export.js) legt fest: GLB in Metern, OBJ in
   *    Millimetern. Ein OBJ in Metern laedt in jedem CAD-Programm um den
   *    Faktor 1000 zu klein.
   *
   * 3. Es fehlte jede Sachangabe. Weder Artikelnummer noch Einheit standen in
   *    der Datei — ein Netz ohne Herkunft.
   */
  const handleExportCAD = (format: 'glb' | 'obj') => {
    const product = activeProductModuleRef.current;
    if (!product || exporting) return;
    setExporting(true);

    let holder: THREE.Group | null = null;
    try {
      // Neutral neu bauen: kein Schnitt, keine Explosion.
      const assembly = product.build(selectedSize, selectedVariant, null);
      holder = new THREE.Group();
      holder.name = `k_aqua_${product.id}_d${selectedSize}`;

      // Die Deckflaechen des Halbschnitts sind Hilfsgeometrie des Viewers.
      // Mitexportiert ergaeben sie zusaetzliche Waende mitten im Bauteil.
      const schnittflaechen: THREE.Object3D[] = [];
      assembly.root.traverse((o: THREE.Object3D) => {
        if (/_Schnitt$/.test(o.name || '')) schnittflaechen.push(o);
      });
      schnittflaechen.forEach((o) => o.parent?.remove(o));

      holder.add(assembly.root);

      const article = articleForSize(product, selectedSize);
      const code = article?.code ?? null;
      const base = `K-Aqua_${product.id?.split('/').pop() || 'Bauteil'}_d${selectedSize}${
        code ? `_${code}` : ''
      }`;

      if (format === 'glb') {
        // GLB in Metern, so wie der Exportvertrag es festlegt.
        holder.scale.setScalar(0.001);
        holder.userData = {
          kaqua: {
            id: product.id,
            article: code,
            size: selectedSize,
            unit: 'm',
            title: product.titleDe ?? product.titleEn ?? null,
            catalogue: 'KA-Katalog_GB_06-2025',
            source: 'k-aqua.de',
          },
        };

        const exporter = new GLTFExporter();
        exporter.parse(
          holder,
          (gltf) => {
            triggerDownload(
              new Blob([gltf as ArrayBuffer], { type: 'model/gltf-binary' }),
              `${base}.glb`,
            );
            setExporting(false);
          },
          (err) => {
            console.error('GLTF export error:', err);
            setExporting(false);
          },
          { binary: true },
        );
        return;
      }

      // OBJ in Millimetern — also ohne Skalierung, das Modell rechnet in mm.
      const exporter = new OBJExporter();
      const header = [
        `# K-Aqua 3D — ${product.titleDe ?? product.titleEn ?? product.id}`,
        `# Produkt-ID: ${product.id}`,
        code ? `# Artikel: ${code}   Nennmaß: d${selectedSize}` : `# Nennmaß: d${selectedSize}`,
        '# Einheit: Millimeter',
        '# Katalog: KA-Katalog_GB_06-2025',
        '# Quelle: k-aqua.de',
        '',
      ].join('\n');
      triggerDownload(
        new Blob([header + exporter.parse(holder)], { type: 'text/plain' }),
        `${base}.obj`,
      );
      setExporting(false);
    } catch (err) {
      console.error('CAD export error:', err);
      setExporting(false);
    } finally {
      // Die Exportkopie haengt nicht an der Szene und muss selbst
      // aufgeraeumt werden, sonst bleibt sie bei jedem Export im Speicher.
      if (holder && format === 'obj') {
        holder.traverse((child: any) => {
          if (child.geometry) child.geometry.dispose();
        });
      }
    }
  };

  /* Hat dieses Bauteil ueberhaupt Massangaben? 22 der 70 Module deklarieren
     keine — dort bleibt der Bemassungsknopf blass statt tot. */
  const hatBemassung = dimensionsList.length > 0;

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-card/90 via-background to-card border border-card-border shadow-lift select-none flex flex-col',
        heightClass,
        className,
        /* Vollbild, egal auf welchem Weg: deckender Grund statt des
           Verlaufs. `from-card/90` liess die Seite oben zu zehn Prozent
           durchscheinen — genau der unprofessionelle Eindruck, um den es
           hier geht. `bg-none` nimmt das Verlaufsbild weg, `bg-background`
           setzt eine volle Farbe darunter. */
        (isFullscreen || istEchtesVollbild) &&
          '!bg-none !bg-background !rounded-none !border-0',
        /* Echtes Vollbild: der Browser gibt dem Element bereits die volle
           Flaeche. Nur die feste Hoehe aus `heightClass` muss weichen. */
        istEchtesVollbild && '!h-full !w-full',
        /* Rueckfall ohne Browser-Vollbild. `100dvh` statt `h-screen`, damit
           die Werkzeugleiste nicht unter der Adressleiste mobiler Browser
           verschwindet. */
        isFullscreen && '!fixed !inset-0 !z-[9999] !h-[100dvh] !w-screen'
      )}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full flex-1 block touch-none cursor-grab active:cursor-grabbing outline-none"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/80 backdrop-blur-md gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="text-xs font-heading font-bold text-foreground">
            Lade maßhaltige 3D-CAD-Geometrie...
          </span>
        </div>
      )}

      {/* Error Fallback */}
      {!effectiveId && !loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/95 p-6 text-center">
          <Box className="w-12 h-12 text-muted-foreground/50 mb-3" />
          <h4 className="text-sm font-heading font-bold text-foreground mb-1">{t('noModelTitle')}</h4>
          <p className="text-xs text-muted-foreground max-w-xs">{t('noModelHint')}</p>
        </div>
      )}

      {error && !loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/95 p-6 text-center">
          <Box className="w-12 h-12 text-muted-foreground/50 mb-3" />
          <h4 className="text-sm font-heading font-bold text-foreground mb-1">{t('errorTitle')}</h4>
          <p className="text-xs text-muted-foreground max-w-xs">{t('errorHint')}</p>
          <p className="text-[10px] text-muted-foreground/60 mt-2 font-mono">
            {t('errorModule', { id: error })}
          </p>
        </div>
      )}

      {/* Top Header Badge */}
      <div className="absolute top-2.5 start-2.5 sm:top-4 sm:start-4 pointer-events-none z-10 flex items-center gap-2 max-w-[48%] sm:max-w-none">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-card-border text-foreground shadow-sm min-w-0">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-xs font-heading font-bold tracking-wide truncate">
            {productData?.titleDe || '3D CAD Studio'}
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary-soft text-primary font-bold shrink-0">
            d{selectedSize}
          </span>
        </div>
      </div>

      {/* Werkzeugleiste: auf Mobil als scrollbare Zeile ÜBER der
          Größenleiste — sieben Buttons in einer nicht umbrechenden
          Reihe oben rechts kollidierten dort mit dem Titel-Badge und
          sahen zerquetscht aus. Desktop bleibt oben rechts. */}
      {showControls && !loading && (
        <div
          className={clsx(
            'absolute z-10 flex items-center gap-1.5 sm:gap-2',
            'start-2 end-2 overflow-x-auto scrollbar-none py-1 px-0.5',
            showSizeSelector && availableSizes.length > 1 ? 'bottom-[3.55rem]' : 'bottom-2',
            'sm:top-4 sm:end-4 sm:bottom-auto sm:start-auto sm:overflow-visible sm:justify-end sm:py-0 sm:px-0'
          )}
        >
          {/* Section Cut Toggle */}
          <button
            type="button"
            onClick={handleToggleSection}
            title={isSection ? t('sectionOff') : t('sectionOn')}
            aria-label={t('section')}
            className={clsx(
              'p-2 sm:p-2.5 shrink-0 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1 sm:gap-1.5',
              isSection
                ? 'bg-primary text-primary-foreground border-primary shadow-diffuse'
                : 'bg-background/85 hover:bg-card border-card-border text-foreground'
            )}
          >
            <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline text-[11px]">{t('section')}</span>
          </button>

          {/* Dimension Lines Toggle

              22 der 70 Bauteile deklarieren keine Massangaben. Dort faerbte
              sich der Knopf bisher aktiv und zeigte nichts — ohne jede
              Rueckmeldung. Jetzt ist er blass und sagt im Titel, warum.

              Bewusst `aria-disabled` statt `disabled`: ein wirklich
              deaktivierter Knopf feuert keine Mausereignisse, dann erschiene
              der erklaerende Titel nie. Und bewusst nicht ausgeblendet — das
              aenderte die Breite der Werkzeugleiste und liesse sie im
              3D-Studio bei jedem Produktwechsel springen. */}
          <button
            type="button"
            onClick={() => {
              if (hatBemassung) setShowDimensions((v) => !v);
            }}
            title={hatBemassung ? t('dimensions') : t('dimensionsNone')}
            aria-label={hatBemassung ? t('dimensions') : t('dimensionsNone')}
            aria-disabled={!hatBemassung}
            aria-pressed={showDimensions}
            className={clsx(
              'p-2 sm:p-2.5 shrink-0 rounded-xl border text-xs font-bold transition-all shadow-sm backdrop-blur-md flex items-center gap-1 sm:gap-1.5',
              !hatBemassung
                ? 'bg-background/85 border-card-border text-foreground opacity-40 cursor-not-allowed'
                : showDimensions
                  ? 'bg-primary text-primary-foreground border-primary shadow-diffuse cursor-pointer'
                  : 'bg-background/85 hover:bg-card border-card-border text-foreground cursor-pointer'
            )}
          >
            <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline text-[11px]">{t('dimensionsShort')}</span>
          </button>

          {/* Auto-Rotate Turntable Toggle */}
          <button
            type="button"
            onClick={handleToggleAutoRotate}
            title={isAutoRotate ? t('rotateStop') : t('rotateStart')}
            aria-label={t('rotate')}
            className={clsx(
              'p-2 sm:p-2.5 shrink-0 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1 sm:gap-1.5',
              isAutoRotate
                ? 'bg-primary/20 text-primary border-primary shadow-sm'
                : 'bg-background/85 hover:bg-card border-card-border text-foreground'
            )}
          >
            <RotateCw className={clsx('w-3.5 h-3.5 sm:w-4 sm:h-4', isAutoRotate && 'animate-spin-slow')} />
          </button>

          {/* Wireframe Toggle */}
          <button
            type="button"
            onClick={handleToggleWireframe}
            title={t('wireframeToggle')}
            aria-label={t('wireframe')}
            className={clsx(
              'p-2 sm:p-2.5 shrink-0 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1.5',
              isWireframe
                ? 'bg-card text-primary border-primary'
                : 'bg-background/85 hover:bg-card border-card-border text-foreground'
            )}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Reset Camera */}
          <button
            type="button"
            onClick={handleResetCamera}
            title={t('center')}
            aria-label={t('center')}
            className="p-2 sm:p-2.5 shrink-0 rounded-xl bg-background/85 hover:bg-card border border-card-border text-foreground text-xs shadow-sm cursor-pointer backdrop-blur-md transition-all flex items-center justify-center"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* CAD Export — Klick statt group-hover: Hover existiert auf
              Touch-Geräten nicht, und der Katalog wird im Vertrieb vom
              Tablet gezeigt.

              Nur der Knopf steht hier. Das Menü liegt bewusst AUSSERHALB
              dieser Leiste, siehe die Begründung an seiner Stelle. */}
          <div className="shrink-0" ref={exportKnopfRef}>
            <button
              type="button"
              onClick={() => setExportOpen((v) => !v)}
              aria-expanded={exportOpen}
              title={t('exportCad')}
              aria-label={t('exportCad')}
              className="p-2 sm:p-2.5 shrink-0 rounded-xl bg-background/85 hover:bg-card border border-card-border text-foreground text-xs font-bold shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1 transition-all"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="hidden lg:inline text-[11px]">CAD</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
          </div>

          {/* Fullscreen Expand Button */}
          <button
            type="button"
            onClick={() => void vollbildUmschalten()}
            title={isFullscreen || istEchtesVollbild ? t('fullscreenExit') : t('fullscreen')}
            aria-label={t('fullscreen')}
            aria-pressed={isFullscreen || istEchtesVollbild}
            className="p-2 sm:p-2.5 shrink-0 rounded-xl bg-background/85 hover:bg-card border border-card-border text-foreground text-xs shadow-sm cursor-pointer backdrop-blur-md transition-all flex items-center justify-center"
          >
            {isFullscreen || istEchtesVollbild ? (
              <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      )}

      {/* Das CAD-Exportmenü.
       *
       * WARUM ES NICHT BEIM KNOPF STEHT. Genau dort stand es, und auf
       * Touch-Geräten war der Export dadurch nicht bedienbar: die
       * Werkzeugleiste oben trägt unter 640 px `overflow-x-auto`, damit
       * ihre sieben Knöpfe auf schmalen Geräten waagerecht scrollen
       * können. Sobald aber EINE Achse auf `auto` steht, macht die
       * CSS-Spezifikation aus dem `visible` der anderen Achse ebenfalls
       * `auto` — die Leiste beschneidet also auch SENKRECHT, und sie ist
       * nur rund 40 px hoch. Das Menü klappte mit `bottom-full` nach oben
       * heraus, lag damit vollständig ausserhalb dieser 40 px und wurde
       * abgeschnitten. Zu sehen war nur ein Streifen, der beim Scrollen
       * der Leiste kurz auftauchte und wieder verschwand.
       *
       * Ab 640 px hebt `sm:overflow-visible` die Beschneidung auf; deshalb
       * fiel es am Desktop nie auf, wohl aber auf dem Handy und auf einem
       * Surface, das ab Werk auf 200 % skaliert und damit unter 640 px
       * CSS-Breite landet.
       *
       * Als Geschwister der Leiste — im Viewer, aber ausserhalb des
       * scrollenden Kastens — kann nichts es mehr beschneiden. Die
       * Ausrichtung folgt derselben Ecke wie die Leiste. */}
      {showControls && !loading && exportOpen && (
        <div
          ref={exportMenueRef}
          className={clsx(
            'absolute z-30 w-44 end-2 sm:end-4 flex flex-col gap-1',
            'bg-card border border-card-border rounded-xl shadow-xl p-1.5',
            // Mobil sitzt die Leiste unten; das Menü klappt darüber auf und
            // rückt mit, wenn die Größenleiste die Leiste nach oben schiebt.
            showSizeSelector && availableSizes.length > 1
              ? 'bottom-[6.5rem]'
              : 'bottom-[3.45rem]',
            // Ab 640 px sitzt die Leiste oben rechts; das Menü klappt darunter.
            'sm:bottom-auto sm:top-[3.6rem]'
          )}
        >
          <button
            type="button"
            onClick={() => { setExportOpen(false); handleExportCAD('glb'); }}
            className="w-full text-start px-2.5 py-1.5 rounded-lg hover:bg-primary-soft hover:text-primary text-xs font-semibold text-foreground transition-colors cursor-pointer"
          >
            GLTF / GLB (.glb)
          </button>
          <button
            type="button"
            onClick={() => { setExportOpen(false); handleExportCAD('obj'); }}
            className="w-full text-start px-2.5 py-1.5 rounded-lg hover:bg-primary-soft hover:text-primary text-xs font-semibold text-foreground transition-colors cursor-pointer"
          >
            Wavefront (.obj)
          </button>
        </div>
      )}

      {/* Werte zur Bemaßung.
          Einspaltig statt zweispaltig: die Klartextnamen aus `dimensionKey`
          — etwa „Achse bis Gewindespitze z₁" — brachen in zwei Spalten
          unlesbar um. Die Maßlinien selbst stehen jetzt im Modell; dieser
          Kasten liest die Werte dazu ab. */}
      {showDimensions && dimensionsList.length > 0 && (
        <div className="absolute top-12 sm:top-16 start-2.5 sm:start-4 z-10 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-card/95 backdrop-blur-md border border-card-border shadow-lg max-w-[calc(100vw-32px)] sm:max-w-[19rem] animate-reveal">
          <div className="text-[10px] font-mono uppercase text-primary font-bold mb-1.5 flex items-center gap-1">
            <Ruler className="w-3 h-3" /> {t('dimensions')}
          </div>
          <div className="flex flex-col gap-y-1 text-xs">
            {dimensionsList.map((dim, idx) => (
              <div key={idx} className="flex items-baseline justify-between gap-3">
                <span className="text-muted-foreground text-[11px] min-w-0">
                  <span className="font-mono text-foreground">{dim.label}</span>
                  {dim.name ? ` · ${dim.name}` : null}
                </span>
                <span className="font-mono font-bold text-foreground shrink-0 tabular-nums">
                  {dim.value} {dim.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Size Switcher Strip (Unified Native Controls) */}
      {showSizeSelector && availableSizes.length > 1 && (
        <div className="absolute bottom-2 start-2 end-2 sm:bottom-4 sm:start-4 sm:end-4 z-10 flex items-center justify-between gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-background/90 backdrop-blur-md border border-card-border shadow-sm overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-heading font-bold text-foreground pe-2 border-e border-card-border">
            <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="hidden sm:inline">{t('nominalSize')}</span>
            <span className="sm:hidden font-mono">DN</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {availableSizes.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => handleSelectSize(d)}
                className={clsx(
                  'px-2.5 sm:px-3 py-1 rounded-lg sm:rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer',
                  selectedSize === d
                    ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                    : 'bg-card hover:bg-card-border/50 text-foreground border border-card-border'
                )}
              >
                d{d}
              </button>
            ))}
          </div>

          {/*
            Farbwähler. Steht im Platz des früheren Bedienhinweises: Die
            Rohrserien sind neben dem Standardgrün auch in Blau, Curry und
            Mocca lieferbar (RAL 5005 / 1002 / 7032), und das war bisher
            ausschließlich als vier Bildkacheln auf der Rohrübersicht zu
            sehen — im 3D-Modell gar nicht.

            Erscheint nur bei Produkten, die Varianten deklarieren; für
            Formteile, Ventile und Werkzeuge ändert sich nichts.
          */}
          {availableVariants.length > 1 ? (
            <div className="flex items-center gap-1.5 shrink-0 ps-2 border-s border-card-border">
              {availableVariants.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleSelectVariant(v)}
                  title={VARIANT_LABEL[v]?.name ?? v}
                  aria-label={VARIANT_LABEL[v]?.name ?? v}
                  aria-pressed={selectedVariant === v}
                  className={clsx(
                    'w-6 h-6 rounded-full border-2 transition-all shrink-0 cursor-pointer',
                    selectedVariant === v
                      ? 'border-primary scale-110 shadow-sm'
                      : 'border-card-border hover:border-muted-foreground'
                  )}
                  style={{ background: VARIANT_LABEL[v]?.hex ?? '#888' }}
                />
              ))}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground shrink-0 ps-2 border-s border-card-border">
              <span>360° Touch / Maus</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
