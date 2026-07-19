// components/kontakt/KontaktBlock.tsx — Server Component Wrapper.
// Rendert Kontext serverseitig (indexierbar, 0 JS), Formular ist Client-Insel.
import { KONTAKT, type KontaktSlug } from "@/content/kontakt-bloecke";
import { KontaktForm } from "./KontaktForm";

export function KontaktBlock({ slug = "fallback" as KontaktSlug }) {
  const c = KONTAKT[slug] ?? KONTAKT.fallback;
  if (!KONTAKT[slug]) console.warn(`KontaktBlock: kein Content fuer Slug "${slug}", Fallback aktiv`);
  return (
    <section className="kqk v-block" aria-label="Kontakt">
      <div className="kqk-grid">
        <div className="kqk-ctx">
          <div className="kqk-k">{c.kicker}</div>
          <h2 className="kqk-h">{c.head}</h2>
          <p className="kqk-t">{c.text}</p>
          <div className="kqk-promise"><i /><span>Antwort innerhalb eines Arbeitstages</span></div>
        </div>
        <KontaktForm slug={slug} interest={c.interest} done={c.done} />
      </div>
    </section>
  );
}
