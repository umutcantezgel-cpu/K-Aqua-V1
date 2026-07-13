import { getProductBySlug } from './lib/products';
async function run() {
  const p = await getProductBySlug('accessories', 'backing-flange');
  console.log(p?.content);
}
run();
