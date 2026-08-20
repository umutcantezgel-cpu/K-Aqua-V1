/* K-Aqua 3D — Sammeleinstieg.

   loadProduct(id) lädt ein Produktmodul erst, wenn es gebraucht wird.
   Bei achtundzwanzig Modellen macht das den Unterschied zwischen 40 kB
   und 700 kB im initialen Bundle.

   Beispiel:
     import { mount, loadProduct } from '@kaqua/3d';
     const product = await loadProduct('fittings/cap');
     mount(product, { host: document.querySelector('#viewer') }); */

export * from './kaqua-3d-core.mjs';
export { REGISTRY } from './registry.mjs';

const LOADERS = {
  'valves/pp-r-ball-valve-ball-in-pp': () => import('./products/ball-valve-pp.mjs'),
  'fittings/cap': () => import('./products/cap.mjs'),
  'fittings/socket': () => import('./products/socket.mjs'),
  'fittings/elbow-45': () => import('./products/elbow-45.mjs'),
  'fittings/elbow-90': () => import('./products/elbow-90.mjs'),
  'fittings/tee': () => import('./products/tee.mjs'),
  'fittings/cross': () => import('./products/cross.mjs'),
  'fittings/reducing-bush': () => import('./products/reducing-bush.mjs'),
  'pipes/k-pipe-pp-r-sdr-6': () => import('./products/k-pipe-pp-r-sdr-6.mjs'),
  'pipes/k-pipe-pp-r-sdr-11': () => import('./products/k-pipe-pp-r-sdr-11.mjs'),
  'pipes/k-pipe-purple-pp-r-sdr-11': () => import('./products/k-pipe-purple-pp-r-sdr-11.mjs'),
  'pipes/k-pipe-pp-rct-sdr-7-4': () => import('./products/k-pipe-pp-rct-sdr-74.mjs'),
  'pipes/k-fiber-pipe-pp-r-sdr-7-4': () => import('./products/k-fiber-pipe-pp-r-sdr-74.mjs'),
  'pipes/k-fiber-pipe-pp-rct-sdr-7-4': () => import('./products/k-fiber-pipe-pp-rct-sdr-74.mjs'),
  'pipes/k-fiber-pipe-pp-r-sdr-9': () => import('./products/k-fiber-pipe-pp-r-sdr-9.mjs'),
  'pipes/k-fiber-pipe-pp-r-sdr-11': () => import('./products/k-fiber-pipe-pp-r-sdr-11.mjs'),
  'pipes/k-fiber-pipe-pp-r-sdr-17': () => import('./products/k-fiber-pipe-pp-r-sdr-17.mjs'),
  'pipes/k-fiberclima-pipe-pp-rct-sdr-11': () => import('./products/k-fiberclima-pipe-pp-rct-sdr-11.mjs'),
  'pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4': () => import('./products/k-fiber-uv-pipe-pp-rct-sdr-74.mjs'),
  'pipes/k-fiber-uv-pipe-pp-r-sdr-7-4': () => import('./products/k-fiber-uv-pipe-pp-r-sdr-74.mjs'),
  'transition-fittings/adaptor-socket-male-thread': () => import('./products/adaptor-socket-male-thread.mjs'),
  'transition-fittings/union': () => import('./products/union.mjs'),
  'transition-fittings/metal-union-female-thread': () => import('./products/metal-union-female-thread.mjs'),
  'accessories/plug': () => import('./products/plug.mjs'),
  'accessories/flat-gasket': () => import('./products/flat-gasket.mjs'),
  'accessories/flat-gasket-for-unions': () => import('./products/flat-gasket-for-unions.mjs'),
  'accessories/backing-flange': () => import('./products/backing-flange.mjs'),
  'accessories/pipe-clamps': () => import('./products/pipe-clamps.mjs'),
};

export const PRODUCT_IDS = Object.keys(LOADERS);

export async function loadProduct(id) {
  const load = LOADERS[id];
  if (!load) throw new Error('K-Aqua 3D: kein Modell für "' + id + '"');
  return (await load()).default;
}
