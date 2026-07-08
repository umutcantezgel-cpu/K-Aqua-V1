// K-Aqua — HomeDeep: Werk-Kennzahlen-Band + Zertifikats-Badges + CTA zum Trust Center.
//
// QUELLE: kaqua-deep-sections-3.jsx (HomeDeep). PORTIERT 1:1 (1 Abschnitt: StatBand,
// Badge-Leiste, CTA).
// ANGEPASST: usePageL('homedeep') -> getTranslations('homedeep') (Server Component).
// Der Prototyp navigiert per Hash-Router-Callback (`go('trust')`, aus kaqua-app.jsx); das
// reale Repo hat keinen Client-Side-Hash-Router — die CTA wird ein echter, lokalisierter
// Link über lib/i18n/navigation (next-intl `Link`, prefixt automatisch die aktuelle Locale).
// Braucht deshalb KEIN `go`-Prop mehr — vereinfacht die Komponente zur reinen Server Component.
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { StatBand } from "@/components/ui/StatBand";
import { Link } from "@/lib/i18n/navigation";
import { ArrowRight } from "@/components/ui/icon";

export async function HomeDeep() {
  const t = await getTranslations("homedeep");
  const plant = t.raw("plant") as Array<{ n: string; u?: string; l: string }>;
  const badges = t.raw("badges") as string[];

  return (
    <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="home-plant-numbers">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionHead eyebrow={t("plantEyebrow")} title={t("plantTitle")} />
        </Reveal>
        <Reveal delay={0.08}>
          <StatBand stats={plant} />
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {badges.map((b) => (
                <span key={b} className="rounded-full bg-primary-soft px-3 py-1 text-tiny font-semibold text-foreground">
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-3 text-tiny leading-relaxed text-faint-foreground">{t("badgeNote")}</p>
            <div className="mt-4">
              <Link
                href="/trust-center"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-card-border bg-transparent px-6 font-heading text-body font-semibold text-foreground outline-none transition-all duration-fast hover:border-primary hover:bg-primary-soft hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t("badgeCta")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
