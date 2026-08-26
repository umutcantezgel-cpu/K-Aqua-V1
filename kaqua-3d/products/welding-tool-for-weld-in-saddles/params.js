import { article } from './data.js';
import { toolParams } from '../_tooldie/parts.js';

export function params(key) {
  const a = article(key);
  return Object.assign({}, a, toolParams(a.d));
}
