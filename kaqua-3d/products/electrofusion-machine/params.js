import { article } from './data.js';
export function params() {
  const P = Object.assign({}, article());
  P.kastenB = 240; P.kastenH = 200; P.kastenT = 150;
  P.sollBreite = 242;   // konstruktiv, inkl. Fasen
  return P;
}
