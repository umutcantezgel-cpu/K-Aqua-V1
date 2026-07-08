import { getAllProducts } from "./lib/products";
console.log(getAllProducts().map(p => p.title));
