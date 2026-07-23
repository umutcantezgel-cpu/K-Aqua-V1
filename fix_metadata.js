const fs = require('fs');

let content = fs.readFileSync('lib/seo/metadata.ts', 'utf8');

const badFunc = `export async function getWebPageJsonLd(locale: string, pageKey: string, type: WebPageJsonLd["@type"] = "WebPage", override?: { title?: string, description?: string }): Promise<WebPageJsonLd> {
  const t = await getTranslations({ locale, namespace: "pages" }).catch(() => null);
  const meta = t && typeof t.raw === 'function' ? (t.raw(pageKey) as string[]).catch ? [] : (t.raw(pageKey) as string[] || []) : [];
  const title = override?.title || (meta && meta[0]) || "K-Aqua";
  const desc = override?.description || (meta && meta[1]) || "";`;

const goodFunc = `export async function getWebPageJsonLd(locale: string, pageKey: string, type: WebPageJsonLd["@type"] = "WebPage", override?: { title?: string, description?: string }): Promise<WebPageJsonLd> {
  let meta: string[] = [];
  try {
    const t = await getTranslations({ locale, namespace: "pages" });
    meta = t.raw(pageKey) as string[];
  } catch (e) {
    // Ignore error if namespace or key is missing
  }
  const title = override?.title || meta[0] || "K-Aqua";
  const desc = override?.description || meta[1] || "";`;

content = content.replace(badFunc, goodFunc);
fs.writeFileSync('lib/seo/metadata.ts', content);
