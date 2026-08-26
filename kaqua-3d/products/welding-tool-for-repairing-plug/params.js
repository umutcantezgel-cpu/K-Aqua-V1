import { article } from './data.js';
export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);
  P.kopfR = a.d / 2 + 2.5;             // ASSUMPTION Heizkopf um den Stopfen
  P.kopfH = Math.max(10, a.d * 1.6);
  P.schaftR = 3.2;
  P.schaftL = 55;
  P.kragenR = P.kopfR + 2;             // gelber Isolierring im Render
  return P;
}
