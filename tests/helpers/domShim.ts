// Minimal-DOM für die 3D-Modelle.
//
// Die Produktmodule erzeugen prozedurale Texturen über ein 2D-Canvas. Die
// Geometrie selbst entsteht rein rechnerisch — WebGL braucht es erst zum
// Anzeigen. Mit diesem Shim lassen sich alle Modelle ohne Browser bauen und
// prüfen.

/* eslint-disable @typescript-eslint/no-explicit-any */

class FakeCtx {
  createImageData(w: number, h: number) {
    return { data: new Uint8ClampedArray(w * h * 4), width: w, height: h };
  }
  putImageData() {}
  fillRect() {}
  clearRect() {}
  drawImage() {}
  beginPath() {}
  arc() {}
  fill() {}
  stroke() {}
  moveTo() {}
  lineTo() {}
  closePath() {}
  save() {}
  restore() {}
  translate() {}
  rotate() {}
  scale() {}
  fillText() {}
  createLinearGradient() { return { addColorStop() {} }; }
  createRadialGradient() { return { addColorStop() {} }; }
  measureText() { return { width: 0 }; }
  set fillStyle(_v: unknown) {}
  set strokeStyle(_v: unknown) {}
  set lineWidth(_v: unknown) {}
  set font(_v: unknown) {}
  set globalAlpha(_v: unknown) {}
}

class FakeCanvas {
  width = 1;
  height = 1;
  style: Record<string, unknown> = {};
  getContext() { return new FakeCtx(); }
  toDataURL() { return 'data:,'; }
  addEventListener() {}
  removeEventListener() {}
  appendChild() {}
}

/** Hängt ein Minimal-DOM ein, falls keins vorhanden ist. */
export function installDomShim() {
  const g = globalThis as any;
  if (g.document) return;

  g.document = {
    createElement: (tag: string) =>
      tag === 'canvas'
        ? new FakeCanvas()
        : {
            style: {},
            appendChild() {},
            setAttribute() {},
            addEventListener() {},
            classList: { add() {}, remove() {} },
            children: [],
          },
    createElementNS: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    body: { appendChild() {}, style: {} },
    head: { appendChild() {} },
    querySelector: () => null,
    getElementById: () => null,
  };
  g.window = {
    devicePixelRatio: 1,
    addEventListener() {},
    removeEventListener() {},
    matchMedia: () => ({ matches: false, addEventListener() {} }),
  };
  // navigator ist in Node schreibgeschützt und wird von der Bibliothek nicht gebraucht.
}
