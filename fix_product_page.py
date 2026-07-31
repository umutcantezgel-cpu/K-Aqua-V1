import re

with open('app/[locale]/produkte/[category]/[slug]/page.tsx', 'r') as f:
    content = f.read()

# 1. Remove DynamicSeoBlock import
content = re.sub(r"import { DynamicSeoBlock } from '@/components/seo/DynamicSeoBlock';\n", "", content)

# 2. Replace generatedSeoNarrative logic with seoTextHtml
seo_logic_replacement = """  const seoTextHtml = locale === 'de' ? product.seoTextDe 
                    : locale === 'ar' ? product.seoTextAr 
                    : product.seoTextEn;"""
content = re.sub(r"  let generatedSeoNarrative = \"\";[\s\S]*?if \(!generatedSeoNarrative\) \{[\s\S]*?generatedSeoNarrative = tProd\('narrative\.intro', \{ title: localizedTitle, codes: codes \}\);\n  \}", seo_logic_replacement, content)

# 3. Remove 2. DYNAMIC SEO TEXT BLOCKS
content = re.sub(r"      \{\/\* 2\. DYNAMIC SEO TEXT BLOCKS \(Unique per product\) \*\/\}[\s\S]*?</section>", "", content, count=1)

# 4. Replace generatedSeoNarrative usage
seo_usage_replacement = """                {/* 4. Individual SEO Technical Specs */}
                {seoTextHtml && (
                  <div className="mt-8 p-8 bg-background-subtle border border-card-border rounded-xl shadow-sm">
                    <h2 className="font-heading font-bold text-xl text-foreground mb-6">
                      Technische Spezifikationen & Detailwissen
                    </h2>
                    <div 
                      className="prose dark:prose-invert max-w-none w-full text-body text-muted-foreground leading-relaxed
                                 prose-h2:text-h4 prose-h2:font-heading prose-h2:text-foreground prose-h2:mt-6 prose-h2:mb-3
                                 prose-p:mb-4
                                 prose-ul:my-4 prose-li:my-1"
                      dangerouslySetInnerHTML={{ __html: seoTextHtml }}
                    />
                  </div>
                )}"""
content = re.sub(r"                \{\/\* 4\. Generated Technical SEO Narrative & Quality Assurance \*\/\}[\s\S]*?</div>\n                \)}", seo_usage_replacement, content)

# 5. Remove DynamicSeoBlock usage
content = re.sub(r"                \{\/\* Dynamic SEO Word Count Padding \(Visually Hidden\) \*\/\}[\s\S]*?<DynamicSeoBlock [^\>]+/>", "", content)

with open('app/[locale]/produkte/[category]/[slug]/page.tsx', 'w') as f:
    f.write(content)
