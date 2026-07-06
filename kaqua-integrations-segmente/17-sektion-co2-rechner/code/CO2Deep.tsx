// K-Aqua — CO2Deep: Methodik-Erklärung + Green-Building-Zertifizierungsbezug + Scope 1/2/3.
//
// QUELLE: kaqua-deep-sections-1.jsx (CO2Deep). PORTIERT 1:1.
// ANGEPASST: usePageL('co2x') -> getTranslations('co2x') (Server Component). t.raw() für
// meth[]/certs[] (strukturiert). BentoCard -> Card.
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";

interface MethodItem {
  t: string;
  d: string;
}
interface CertItem {
  t: string;
  d: string;
}

export async function CO2Deep() {
  const t = await getTranslations("co2x");
  const meth = t.raw("meth") as MethodItem[];
  const certs = t.raw("certs") as CertItem[];

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="co2-methodology">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("methEyebrow")} title={t("methTitle")} lead={t("methLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {meth.map((m, i) => (
              <Reveal key={m.t} delay={i * 0.07}>
                <Card className="h-full">
                  <h3 className="font-heading text-small font-bold text-foreground">{m.t}</h3>
                  <p className="text-tiny text-muted-foreground">{m.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="co2-green-building">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("certEyebrow")} title={t("certTitle")} lead={t("certLead")} />
          </Reveal>
          <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {certs.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.07}>
                <Card tint className="h-full">
                  <h3 className="font-heading text-body font-bold text-foreground">{c.t}</h3>
                  <p className="text-small text-muted-foreground">{c.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <Card>
              <h3 className="font-heading text-body font-bold text-foreground">{t("scopeTitle")}</h3>
              <p className="text-body text-muted-foreground">{t("scopeText")}</p>
            </Card>
          </Reveal>
          <p className="mt-3 text-tiny leading-relaxed text-faint-foreground">{t("statNote")}</p>
        </div>
      </section>
    </React.Fragment>
  );
}
