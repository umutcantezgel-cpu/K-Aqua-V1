import { article } from './data.js';
export function params() {
  const P = Object.assign({}, article());
  P.bettL = 420; P.bettB = 150; P.bettH = 60;   // ASSUMPTION Bank
  P.backenR = 82; P.backenX = [-150, -50, 50, 150];
  P.sollBreite = 422.2;   // konstruktiv, inkl. Fasen
  return P;
}
