const fs = require('fs');

let content = fs.readFileSync('lib/seo/metadata.ts', 'utf8');

const oldFunc = `export async function getWebPageJsonLd(locale: string, pageKey: string, type: WebPageJsonLd["@type"] = "WebPage"): Promise<WebPageJsonLd> {
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw(pageKey) as string[];`;

const newFunc = `export async function getWebPageJsonLd(locale: string, pageKey: string, type: WebPageJsonLd["@type"] = "WebPage", override?: { title?: string, description?: string }): Promise<WebPageJsonLd> {
  const t = await getTranslations({ locale, namespace: "pages" }).catch(() => null);
  const meta = t && typeof t.raw === 'function' ? (t.raw(pageKey) as string[]).catch ? [] : (t.raw(pageKey) as string[] || []) : [];
  const title = override?.title || (meta && meta[0]) || "K-Aqua";
  const desc = override?.description || (meta && meta[1]) || "";`;

content = content.replace(oldFunc, newFunc);
content = content.replace('name: meta[0] || "K-Aqua",', 'name: title,');
content = content.replace('description: meta[1] || "",', 'description: desc,');

fs.writeFileSync('lib/seo/metadata.ts', content);
