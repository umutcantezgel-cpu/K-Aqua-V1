// K-Aqua — RefsDeep: Einsatzfelder weltweit (Referenzprogramm nach Gebäudetyp).
//
// QUELLE: kaqua-deep-sections-3.jsx (RefsDeep). PORTIERT 1:1 (1 Abschnitt, 4 Sektoren-Karten).
// ANGEPASST: usePageL('refsx') -> getTranslations('refsx') (Server Component). BentoCard -> Card.
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";

interface SectorItem {
  t: string;
  d: string;
}

export async function RefsDeep() {
  const t = await getTranslations("refsx");
  const sectors = t.raw("sectors") as SectorItem[];

  return (
    <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="references-sectors">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionHead eyebrow={t("secEyebrow")} title={t("secTitle")} lead={t("secLead")} />
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {sectors.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08}>
              <Card className="h-full">
                <h3 className="font-heading text-body font-bold text-foreground">{s.t}</h3>
                <p className="text-small text-muted-foreground">{s.d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
