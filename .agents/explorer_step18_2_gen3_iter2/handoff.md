# Handoff Report — Step 18 Iteration 2 (Remediation of Forensic Audit Integrity Violation)

This handoff report outlines the findings and proposed code modifications to resolve the hardcoded `" km"` suffix translation bypass and the hardcoded `PROD_NOTES` map in `components/sections/GeoCity.tsx` by using localized translation keys from the `"geo"` namespace translator.

---

## 1. Observation

Direct observations made in the codebase:

1. **`components/sections/GeoCity.tsx`**:
   - **Line 63-67**: Hardcoded `PROD_NOTES` dictionary containing translations only for `de`, `en`, and `ar`:
     ```typescript
     const PROD_NOTES: Record<string, string> = {
       de: "Hinweis Produktion: Diese Seiten entsprechen dem Programmatic-SEO-Template (Daten-Slice: Produkt × Regulatorik × Region). In Next.js werden sie per ISR aus dem Headless CMS generiert — inkl. hreflang, Product-/Offer-Schema und semantischer interner Verlinkung.",
       en: "Production Note: These pages correspond to the Programmatic SEO template (data slice: product × regulation × region). In Next.js they are generated via ISR from the Headless CMS — including hreflang, Product/Offer schema, and semantic internal linking.",
       ar: "ملاحظة الإنتاج: تتوافق هذه الصفحات مع نموذج تحسين محركات البحث البرمجي (شريحة البيانات: المنتج × التنظيم × المنطقة). في Next.js يتم إنشاؤها عبر ISR من نظام إدارة المحتوى بدون رأس — بما في ذلك hreflang ومخطط المنتج/العرض والربط الداخلي الدلالي."
     };
     ```
   - **Line 130**: The component reads the production note using the hardcoded dictionary:
     ```typescript
     const prodNote = PROD_NOTES[locale] || PROD_NOTES.de;
     ```
   - **Line 318**: The component formats the distance text with a hardcoded `" km"` suffix:
     ```typescript
     const distanceText = `${nm.country}${DOT}${formattedNmDist} km`;
     ```

2. **`app/[locale]/maerkte/[slug]/page.tsx`**:
   - **Line 90-106**: The page retrieves localized parameters to pass to the `<GeoCity>` component via the `geoTrans` object, but it currently lacks `prodNote` and `km`:
     ```typescript
     const geoTrans = {
       eyebrow: tGeo("eyebrow"),
       cityTitle: tGeo("cityTitle", { city: market.city }),
       cityLead: tGeo("cityLead"),
       allMarkets: tGeo("allMarkets"),
       request: tGeo("request"),
       finder: tGeo("finder"),
       fromPlant: tGeo("fromPlant"),
       regFrame: tGeo("regFrame"),
       water: tGeo("water"),
       typical: tGeo("typical", { city: market.city }),
       onSite: tGeo("onSite"),
       onSiteText: tGeo("onSiteText"),
       toAcademy: tGeo("toAcademy"),
       nearbyEyebrow: tGeo("nearbyEyebrow"),
       nearby: tGeo("nearby"),
     };
     ```

3. **Locale files in `messages/*.json`**:
   - The project contains 12 translation files (ar, de, en, es, fr, it, nl, pl, pt, ru, tr, zh) that currently define a `"geo"` namespace, ending around line 139/140 with `"nearby": "..."`. None of them contain keys for `"prodNote"` or `"km"`.

---

## 2. Logic Chain

1. **Hardcoded Translation Bypass**: By keeping `PROD_NOTES` defined in `GeoCity.tsx` and appending a hardcoded `" km"` unit in `distanceText`, the application bypasses the standard `next-intl` translation catalog. This prevents 9 of the 12 locales from showing fully translated content and violates visual/language integrity policies (e.g. Russian and Arabic should use localized unit spellings `км` and `كم` respectively).
2. **Namespace Expansion**: To fix this, a new `"km"` translation key and a `"prodNote"` translation key must be added inside the `"geo"` namespace across all 12 localization files.
3. **Data Passing**: `app/[locale]/maerkte/[slug]/page.tsx` is the server-side page component that handles translating these parameters. It must read `"prodNote"` and `"km"` from the `"geo"` namespace translator (`tGeo`) and append them to the `geoTrans` prop.
4. **Component Decoupling**: Finally, `components/sections/GeoCity.tsx` must be updated to remove the static `PROD_NOTES` object entirely, define the new properties in its `GeoCityProps` interface, and reference `geoTrans.prodNote` and `geoTrans.km` respectively.

---

## 3. Caveats

- **No Caveats**: The solution completely addresses the forensic audit findings, covers all 12 locale files, and uses the standard translation architecture of the app.

---

## 4. Conclusion

Moving the production note and distance unit to the standard `next-intl` localization catalog fully remediates the forensic audit integrity violations. 

Here are the precise proposed modifications:

### A. Add `"km"` and `"prodNote"` keys inside the `"geo"` namespace of all 12 `messages/*.json` files:

#### 1. `messages/de.json`
```json
    "nearby": "In der Nähe.",
    "prodNote": "Hinweis Produktion: Diese Seiten entsprechen dem Programmatic-SEO-Template (Daten-Slice: Produkt × Regulatorik × Region). In Next.js werden sie per ISR aus dem Headless CMS generiert — inkl. hreflang, Product-/Offer-Schema und semantischer interner Verlinkung.",
    "km": "km"
```

#### 2. `messages/en.json`
```json
    "nearby": "Nearby.",
    "prodNote": "Production Note: These pages correspond to the Programmatic SEO template (data slice: product × regulation × region). In Next.js they are generated via ISR from the Headless CMS — including hreflang, Product/Offer schema, and semantic internal linking.",
    "km": "km"
```

#### 3. `messages/es.json`
```json
    "nearby": "Cerca.",
    "prodNote": "Nota de producción: Estas páginas corresponden a la plantilla SEO programática (segmento de datos: producto × regulación × región). En Next.js se generan a través de ISR desde el CMS headless, incluyendo hreflang, esquema de producto/oferta y enlaces internos semánticos.",
    "km": "km"
```

#### 4. `messages/fr.json`
```json
    "nearby": "À proximité.",
    "prodNote": "Note de production : Ces pages correspondent au modèle de SEO programmatique (segment de données : produit × réglementation × région). Dans Next.js, elles sont générées via ISR à partir du CMS headless — y compris le hreflang, le schéma de produit/offre et le maillage interne sémantique.",
    "km": "km"
```

#### 5. `messages/it.json`
```json
    "nearby": "Nelle vicinanze.",
    "prodNote": "Nota di produzione: Queste pagine corrispondono al template SEO programmatico (segmento dati: prodotto × regolamentazione × regione). In Next.js sono generate tramite ISR dall'Headless CMS — inclusi hreflang, schema Prodotto/Offerta e collegamenti interni semantici.",
    "km": "km"
```

#### 6. `messages/nl.json`
```json
    "nearby": "In de buurt.",
    "prodNote": "Productienotitie: Deze pagina's komen overeen met het Programmatic SEO-sjabloon (datasegment: product × regelgeving × regio). In Next.js werden ze gegenereerd via ISR vanuit het Headless CMS — inclusief hreflang, Product/Offer-schema en semantische interne links.",
    "km": "km"
```

#### 7. `messages/pl.json`
```json
    "nearby": "W pobliżu.",
    "prodNote": "Uwaga produkcyjna: Te strony odpowiadają szablonowi Programmatic SEO (wycinek danych: produkt × regulacja × region). W Next.js są one generowane poprzez ISR z Headless CMS — w tym hreflang, schemat Produkt/Oferta i semantyczne linkowanie wewnętrzne.",
    "km": "km"
```

#### 8. `messages/pt.json`
```json
    "nearby": "Por perto.",
    "prodNote": "Nota de produção: Estas páginas correspondem ao modelo de SEO programático (fatia de dados: produto × regulamentação × região). No Next.js, elas são geradas via ISR a partir do Headless CMS — incluindo hreflang, esquema de Produto/Oferta e links internos semânticos.",
    "km": "km"
```

#### 9. `messages/tr.json`
```json
    "nearby": "Yakınında.",
    "prodNote": "Üretim Notu: Bu sayfalar Programatik SEO şablonuna karşılık gelmektedir (veri dilimi: ürün × yönetmelik × bölge). Next.js'te, hreflang, Ürün/Teklif şeması ve anlamsal dahili bağlantılar dahil olmak üzere Headless CMS'ten ISR aracılığıyla oluşturulurlar.",
    "km": "km"
```

#### 10. `messages/ru.json`
```json
    "nearby": "Рядом.",
    "prodNote": "Примечание по производству: Эти страницы соответствуют шаблону программного SEO (срез данных: продукт × регулирование × регион). В Next.js они генерируются через ISR из Headless CMS — включая hreflang, схему продукта/предложения и семантическую внутреннюю перелинковку.",
    "km": "км"
```

#### 11. `messages/ar.json`
```json
    "nearby": "بالقرب.",
    "prodNote": "ملاحظة الإنتاج: تتوافق هذه الصفحات مع نموذج تحسين محركات البحث البرمجي (شريحة البيانات: المنتج × التنظيم × المنطقة). في Next.js يتم إنشاؤها عبر ISR من نظام إدارة المحتوى بدون رأس — بما в ذلك hreflang ومخطط المنتج/العرض والربط الداخلي الدلالي.",
    "km": "كم"
```

#### 12. `messages/zh.json`
```json
    "nearby": "附近。",
    "prodNote": "生产说明：这些页面对应于程序化 SEO 模板（数据切片：产品 × 监管 × 地区）。在 Next.js 中，它们是通过 ISR 从 Headless CMS 生成的 — 包括 hreflang、产品/报价 Schema 以及语义化内部链接。",
    "km": "公里"
```

---

### B. Proposed modifications to `app/[locale]/maerkte/[slug]/page.tsx`

```typescript
// Lines 90-106 inside GeoCityPage component:
// BEFORE:
  const geoTrans = {
    eyebrow: tGeo("eyebrow"),
    cityTitle: tGeo("cityTitle", { city: market.city }),
    cityLead: tGeo("cityLead"),
    allMarkets: tGeo("allMarkets"),
    request: tGeo("request"),
    finder: tGeo("finder"),
    fromPlant: tGeo("fromPlant"),
    regFrame: tGeo("regFrame"),
    water: tGeo("water"),
    typical: tGeo("typical", { city: market.city }),
    onSite: tGeo("onSite"),
    onSiteText: tGeo("onSiteText"),
    toAcademy: tGeo("toAcademy"),
    nearbyEyebrow: tGeo("nearbyEyebrow"),
    nearby: tGeo("nearby"),
  };

// AFTER:
  const geoTrans = {
    eyebrow: tGeo("eyebrow"),
    cityTitle: tGeo("cityTitle", { city: market.city }),
    cityLead: tGeo("cityLead"),
    allMarkets: tGeo("allMarkets"),
    request: tGeo("request"),
    finder: tGeo("finder"),
    fromPlant: tGeo("fromPlant"),
    regFrame: tGeo("regFrame"),
    water: tGeo("water"),
    typical: tGeo("typical", { city: market.city }),
    onSite: tGeo("onSite"),
    onSiteText: tGeo("onSiteText"),
    toAcademy: tGeo("toAcademy"),
    nearbyEyebrow: tGeo("nearbyEyebrow"),
    nearby: tGeo("nearby"),
    prodNote: tGeo("prodNote"),
    km: tGeo("km"),
  };
```

---

### C. Proposed modifications to `components/sections/GeoCity.tsx`

```typescript
// 1. In interface GeoCityProps (lines 42-58):
// BEFORE:
  geoTrans: {
    eyebrow: string;
    cityTitle: string;
    cityLead: string;
    allMarkets: string;
    request: string;
    finder: string;
    fromPlant: string;
    regFrame: string;
    water: string;
    typical: string;
    onSite: string;
    onSiteText: string;
    toAcademy: string;
    nearbyEyebrow: string;
    nearby: string;
  };

// AFTER:
  geoTrans: {
    eyebrow: string;
    cityTitle: string;
    cityLead: string;
    allMarkets: string;
    request: string;
    finder: string;
    fromPlant: string;
    regFrame: string;
    water: string;
    typical: string;
    onSite: string;
    onSiteText: string;
    toAcademy: string;
    nearbyEyebrow: string;
    nearby: string;
    prodNote: string;
    km: string;
  };

// 2. Remove static PROD_NOTES (lines 63-67):
// BEFORE:
const PROD_NOTES: Record<string, string> = {
  de: "Hinweis Produktion: Diese Seiten entsprechen dem Programmatic-SEO-Template (Daten-Slice: Produkt × Regulatorik × Region). In Next.js werden sie per ISR aus dem Headless CMS generiert — inkl. hreflang, Product-/Offer-Schema und semantischer interner Verlinkung.",
  en: "Production Note: These pages correspond to the Programmatic SEO template (data slice: product × regulation × region). In Next.js they are generated via ISR from the Headless CMS — including hreflang, Product/Offer schema, and semantic internal linking.",
  ar: "ملاحظة الإنتاج: تتوافق هذه الصفحات مع نموذج تحسين محركات البحث البرمجي (شريحة البيانات: المنتج × التنظيم × المنطقة). في Next.js يتم إنشاؤها عبر ISR من نظام إدارة المحتوى بدون رأس — بما في ذلك hreflang ومخطط المنتج/العرض والربط الداخلي الدلالي."
};

// AFTER:
// (Removed entire PROD_NOTES constant mapping)

// 3. Resolve prodNote dynamically (line 130):
// BEFORE:
  const prodNote = PROD_NOTES[locale] || PROD_NOTES.de;

// AFTER:
  const prodNote = geoTrans.prodNote;

// 4. Resolve hardcoded unit (line 318):
// BEFORE:
              const distanceText = `${nm.country}${DOT}${formattedNmDist} km`;

// AFTER:
              const distanceText = `${nm.country}${DOT}${formattedNmDist} ${geoTrans.km}`;
```

---

## 5. Verification Method

To independently verify the resolution:
1. **TypeScript Compilation**: Run `npm run build` or `npx tsc --noEmit` to ensure there are no compilation errors with the new `GeoCityProps` interface properties.
2. **Translation Auditing**: Verify all 12 locale pages (e.g. `/de/maerkte/waldsolms`, `/ar/maerkte/waldsolms`) render the correct production note translation matching the active language without falling back to German.
3. **Unit Localization**: Inspect the nearest markets component in each locale (e.g. `/ar/maerkte/waldsolms` should display distance as `... كم`, and `/ru/maerkte/waldsolms` should display it as `... км`).
4. **Code Quality**: Verify the linter runs successfully with `npm run lint`.
