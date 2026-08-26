import { article } from './data.js';
export function params() {
  const P = Object.assign({}, article());
  P.bettL = 560; P.bettB = 240; P.bettH = 80;
  P.backenR = 160; P.backenX = [-190, -70, 70, 190];
  P.sollBreite = 562.6;   // konstruktiv, inkl. Fasen
  return P;
}
