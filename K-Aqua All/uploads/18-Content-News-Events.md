# News & Events

## Texte aus `messages/de.json` -> `news`
```json
{
  "eyebrow": "News & Events",
  "title1": "Aktuelles von",
  "titleGrad": "K-Aqua.",
  "date": "Oktober 2025",
  "h2": "Wir sind dreifach ISO-zertifiziert",
  "p": "Unser ISO-Managementsystem wurde erweitert und umfasst nun Qualitäts-, Umwelt- und Energiemanagement:",
  "iso": [
    [
      "ISO 9001:2015",
      "Qualitätsmanagementsystem"
    ],
    [
      "ISO 14001:2015",
      "Umweltmanagementsystem"
    ],
    [
      "ISO 50001:2018",
      "Energiemanagementsystem"
    ]
  ],
  "btnDe": "Zertifikat (DE)",
  "btnEn": "Certificate (EN)",
  "eventsTitle": "Messen & Events",
  "eventsText": "Besuchen Sie K-Aqua auf kommenden Veranstaltungen. Aktuell sind keine Termine angekündigt — schauen Sie bald wieder vorbei."
}
```

## Zugehörige Seite (Next.js Page)
### app/[locale]/news/page.tsx
```tsx
import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import Image from "next/image";
import type { Metadata } from "next";
import { blogRegistry } from "@/lib/data/blogRegistry";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("news") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/news",
    locale,
  });
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  const tPosts = await getTranslations({ locale, namespace: "news_posts" });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${t("title1")} ${t("titleGrad")}`,
    "description": t("h2"),
    "url": `${siteUrl}/${locale}/news`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <div className="flex flex-col w-full min-h-screen bg-background">
        <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
          <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1]">
                {t("title1")}{" "}
                <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                  {t("titleGrad")}
                </span>
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogRegistry.map((post, idx) => (
                <Reveal key={post.slug} delay={idx * 0.05} className="h-full">
                  <Link href={`/news/${post.slug}`} className="block h-full group focus-visible:outline-none">
                    <Card className="h-full flex flex-col overflow-hidden transition-all duration-medium group-hover:border-primary group-hover:shadow-glow group-focus-visible:ring-2 group-focus-visible:ring-ring">
                      <div className="relative w-full aspect-[4/3] bg-background-subtle border-b border-card-border overflow-hidden">
                        <Image src={post.image} alt={tPosts(`${post.slug}.title`)} fill className="object-cover transition-transform duration-medium group-hover:scale-[1.03]" />
                      </div>
                      <div className="p-6 flex flex-col flex-1 gap-4">
                        <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
                          <span className="text-primary bg-primary-soft px-2.5 py-1 rounded-md">{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                        <h2 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors line-clamp-3">
                          {tPosts(`${post.slug}.title`)}
                        </h2>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

```


