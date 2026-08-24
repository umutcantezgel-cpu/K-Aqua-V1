/* K-Aqua 3D — Sammeleinstieg.

   loadProduct(id) lädt ein Produktmodul erst, wenn es gebraucht wird.
   Bei siebzig Modellen macht das den Unterschied zwischen 40 kB und
   1,5 MB im initialen Bundle.

   Beispiel:
     import { mount, loadProduct } from '@kaqua/3d';
     const product = await loadProduct('fittings/cap');
     mount(product, { host: document.querySelector('#viewer') }); */

export * from './kaqua-3d-core.mjs';
export { REGISTRY } from './registry.mjs';

const LOADERS = {
  'transition-fittings/adaptor-socket-male-thread': () => import('./products/adaptor-socket-male-thread.mjs'),
  'accessories/backing-flange': () => import('./products/backing-flange.mjs'),
  'valves/pp-r-ball-valve-ball-in-pp': () => import('./products/ball-valve-pp.mjs'),
  'fittings/cap': () => import('./products/cap.mjs'),
  'fittings/cross': () => import('./products/cross.mjs'),
  'fittings/elbow-45': () => import('./products/elbow-45.mjs'),
  'fittings/elbow-45-female-male': () => import('./products/elbow-45-female-male.mjs'),
  'fittings/elbow-90': () => import('./products/elbow-90.mjs'),
  'fittings/elbow-90-female-male': () => import('./products/elbow-90-female-male.mjs'),
  'transition-fittings/elbow-90-male-thread': () => import('./products/elbow-90-male-thread.mjs'),
  'transition-fittings/elbow-bracket-90-female-thread': () => import('./products/elbow-bracket-90-female-thread.mjs'),
  'transition-fittings/elbow-wall-bracket-90-female-thread': () => import('./products/elbow-wall-bracket-90-female-thread.mjs'),
  'fittings/electrofusion-socket': () => import('./products/electrofusion-socket.mjs'),
  'accessories/flat-gasket': () => import('./products/flat-gasket.mjs'),
  'accessories/flat-gasket-for-unions': () => import('./products/flat-gasket-for-unions.mjs'),
  'pipes/k-fiber-pipe-pp-r-sdr-11': () => import('./products/k-fiber-pipe-pp-r-sdr-11.mjs'),
  'pipes/k-fiber-pipe-pp-r-sdr-17': () => import('./products/k-fiber-pipe-pp-r-sdr-17.mjs'),
  'pipes/k-fiber-pipe-pp-r-sdr-6': () => import('./products/k-fiber-pipe-pp-r-sdr-6.mjs'),
  'pipes/k-fiber-pipe-pp-r-sdr-7-4': () => import('./products/k-fiber-pipe-pp-r-sdr-74.mjs'),
  'pipes/k-fiber-pipe-pp-r-sdr-9': () => import('./products/k-fiber-pipe-pp-r-sdr-9.mjs'),
  'pipes/k-fiber-pipe-pp-rct-sdr-7-4': () => import('./products/k-fiber-pipe-pp-rct-sdr-74.mjs'),
  'pipes/k-fiber-uv-pipe-pp-r-sdr-7-4': () => import('./products/k-fiber-uv-pipe-pp-r-sdr-74.mjs'),
  'pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4': () => import('./products/k-fiber-uv-pipe-pp-rct-sdr-74.mjs'),
  'pipes/k-fiberclima-pipe-pp-rct-sdr-11': () => import('./products/k-fiberclima-pipe-pp-rct-sdr-11.mjs'),
  'pipes/k-pipe-pp-r-sdr-11': () => import('./products/k-pipe-pp-r-sdr-11.mjs'),
  'pipes/k-pipe-pp-r-sdr-6': () => import('./products/k-pipe-pp-r-sdr-6.mjs'),
  'pipes/k-pipe-pp-rct-sdr-7-4': () => import('./products/k-pipe-pp-rct-sdr-74.mjs'),
  'pipes/k-pipe-purple-pp-r-sdr-11': () => import('./products/k-pipe-purple-pp-r-sdr-11.mjs'),
  'transition-fittings/metal-union-female-thread': () => import('./products/metal-union-female-thread.mjs'),
  'transition-fittings/metal-union-female-thread-brass': () => import('./products/metal-union-female-thread-brass.mjs'),
  'transition-fittings/metal-union-male-thread': () => import('./products/metal-union-male-thread.mjs'),
  'transition-fittings/metal-union-male-thread-brass': () => import('./products/metal-union-male-thread-brass.mjs'),
  'accessories/pipe-clamps': () => import('./products/pipe-clamps.mjs'),
  'accessories/plug': () => import('./products/plug.mjs'),
  'fittings/reducing-bush': () => import('./products/reducing-bush.mjs'),
  'fittings/socket': () => import('./products/socket.mjs'),
  'fittings/tee': () => import('./products/tee.mjs'),
  'transition-fittings/tee-90-female-thread': () => import('./products/tee-90-female-thread.mjs'),
  'transition-fittings/tee-90-male-thread': () => import('./products/tee-90-male-thread.mjs'),
  'transition-fittings/union': () => import('./products/union.mjs'),
};

export const PRODUCT_IDS = Object.keys(LOADERS);

export async function loadProduct(id) {
  const load = LOADERS[id];
  if (!load) throw new Error('K-Aqua 3D: kein Modell für "' + id + '"');
  return (await load()).default;
}
