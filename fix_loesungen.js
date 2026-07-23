const fs = require('fs');

let content = fs.readFileSync('app/[locale]/loesungen/page.tsx', 'utf8');

content = content.replace('const jsonLd = await getWebPageJsonLd(locale, "solutions");', `const t = await getTranslations({ locale, namespace: "solutions.index" });
  const jsonLd = await getWebPageJsonLd(locale, "solutions", "WebPage", { title: t('meta.title'), description: t('meta.desc') });`);

content = content.replace('const t = await getTranslations({ locale, namespace: "solutions.index" });\n\n  const stickyItems', 'const stickyItems');

fs.writeFileSync('app/[locale]/loesungen/page.tsx', content);
