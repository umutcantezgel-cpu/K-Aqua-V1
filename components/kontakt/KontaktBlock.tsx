"use client";
// components/kontakt/KontaktBlock.tsx
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { KONTAKT_SLUGS, KONTAKT_INTERESSE, type KontaktSlug } from "@/content/kontakt-bloecke";
import { resolveKontaktSlug } from "@/lib/utils/resolveKontaktSlug";
import { KontaktForm } from "./KontaktForm";

export type KontaktVariant = "block" | "band" | "hero" | "inline" | "row" | "sidebar" | "tile" | "sticky" | "fab" | "modal";
export type KontaktTone = "primary" | "glass" | "inverse" | "";

interface Props {
  slug?: KontaktSlug;
  variant?: KontaktVariant;
  tone?: KontaktTone;
  dynamicContext?: string;
}

interface KontaktContent {
  kicker: string;
  head: string;
  short: string;
  text: string;
  interest: string;
  done: string;
}

function Promise_() {
  const tf = useTranslations("kontaktForm");
  return <div className="kqk-promise"><i /><span>{tf("promise")}</span></div>;
}

function CtxFull({ c }: { c: KontaktContent }) {
  return (
    <aside className="kqk-ctx" data-nosnippet="true">
      <div className="kqk-k">{c.kicker}</div>
      <div className="kqk-h font-heading font-bold">{c.head}</div>
      <p className="kqk-t">{c.text}</p>
      <Promise_ />
    </aside>
  );
}

function CtxShort({ c, withPromise }: { c: KontaktContent, withPromise?: boolean }) {
  return (
    <aside className="kqk-ctx" data-nosnippet="true">
      <div className="kqk-k">{c.kicker}</div>
      <div className="kqk-h sh font-heading font-bold">{c.short}</div>
      {withPromise && <Promise_ />}
    </aside>
  );
}

export function KontaktBlock({ slug, variant = "block", tone = "", dynamicContext }: Props) {
  const t = useTranslations("kontaktBlocks");
  const pathname = usePathname();
  
  let actualSlug = slug;
  if (!actualSlug || actualSlug === "fallback") {
    actualSlug = resolveKontaktSlug(pathname);
  }

  // SEO Fix: Prevent Duplicate Content ("Seiten mit doppelten Textblöcken")
  // The layout.tsx renders a global variant="block".
  // However, some pages (Home, News, Academy) already render their own KontaktBlock.
  // We return null for the global block on those pages to avoid duplicate text blocks.
  if (variant === "block" && pathname) {
    const p = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/") || "/";
    if (p === "/" || p.startsWith("/news/") || p.startsWith("/academy")) {
      return null;
    }
  }

  const key: KontaktSlug = (KONTAKT_SLUGS as readonly string[]).includes(actualSlug as KontaktSlug) ? (actualSlug as KontaktSlug) : "fallback";
  
  let resolvedDynamicContext = dynamicContext;
  if (!resolvedDynamicContext && pathname) {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
    if (key === "maerkte") {
      const match = pathWithoutLocale.match(/\/maerkte\/([^\/]+)/);
      const seg = match?.[1];
      if (seg) {
        resolvedDynamicContext = seg.charAt(0).toUpperCase() + seg.slice(1);
      }
    } else if (key === "news") {
      const match = pathWithoutLocale.match(/\/news\/([^\/]+)/);
      const seg = match?.[1];
      if (seg) {
        // Simple heuristic for news title: remove hyphens, title case
        resolvedDynamicContext = seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
    }
  }

  // Try to use dynamicContext if available, otherwise fallback to plain translation
  const c: KontaktContent = {
    kicker: t(`${key}.kicker`),
    head: t(`${key}.head`),
    short: t(`${key}.short`),
    text: resolvedDynamicContext ? `${t(`${key}.text`)} — ${resolvedDynamicContext}` : t(`${key}.text`),
    // NICHT aus den Sprachdateien: dieser Wert wird unveraendert abgesendet
    // und landet im CRM-Feld. Uebersetzt war er in 49 der 65 Sprachen —
    // siehe KONTAKT_INTERESSE in content/kontakt-bloecke.ts.
    interest: KONTAKT_INTERESSE[key],
    done: t(`${key}.done`),
  };

  const cls = `kqk v-${variant} ${tone ? `t-${tone}` : ""}`;

  let content;
  switch (variant) {
    case "block":
      content = (
        <div className="kqk-grid flex flex-col lg:grid lg:grid-cols-[5fr_7fr] gap-8 lg:gap-12 items-start w-full">
          <CtxFull c={c} />
          <div className="w-full min-w-0">
            <KontaktForm slug={key} interest={c.interest} done={c.done} layout="full" />
          </div>
        </div>
      );
      break;
    case "band":
      content = (
        <div className="kqk-ctr flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center justify-between w-full">
          <CtxShort c={c} withPromise />
          <div className="w-full lg:flex-1 min-w-0">
            <KontaktForm slug={key} interest={c.interest} done={c.done} layout="row" slimDone />
          </div>
        </div>
      );
      break;
    case "hero":
      content = (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-center justify-between w-full">
          <div className="kqk-ctx w-full lg:max-w-[440px] flex flex-col gap-2.5 text-start shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono font-bold uppercase tracking-wider w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>{c.kicker || "DIREKTKONTAKT AB WERK"}</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight leading-tight">
              {c.short}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
              {c.text}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>Rückmeldung innerhalb 24h garantiert</span>
            </div>
          </div>
          <div className="kqk-right w-full lg:flex-1 min-w-0">
            <KontaktForm slug={key} interest={c.interest} done={c.done} layout="row" slimDone />
          </div>
        </div>
      );
      break;
    case "inline":
      content = (
        <div className="kqk-ctr flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center justify-between w-full">
          <CtxShort c={c} />
          <div className="w-full lg:flex-1 min-w-0">
            <KontaktForm slug={key} interest={c.interest} done={c.done} layout="row" slimDone />
          </div>
        </div>
      );
      break;
    case "row":
      content = (
        <div style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
          <div className="kqk-promise kqk-ctx" style={{ margin: 0, flex: "none" }}><i /><span className="sh2">{c.short}</span></div>
          <div className="kqk-right" style={{ flex: 1 }}>
            <KontaktForm slug={key} interest={c.interest} done={c.done} layout="row" slimDone />
          </div>
        </div>
      );
      break;
    case "sidebar":
      content = (
        <>
          <CtxShort c={c} withPromise />
          <div style={{ height: "14px" }} />
          <KontaktForm slug={key} interest={c.interest} done={c.done} layout="stack" slimDone />
        </>
      );
      break;
    case "tile":
      content = (
        <>
          <CtxShort c={c} />
          <div style={{ height: "12px" }} />
          <KontaktForm slug={key} interest={c.interest} done={c.done} layout="stack" slimDone />
        </>
      );
      break;
    case "fab":
      content = (
        <>
          <CtxShort c={c} />
          <div style={{ height: "12px" }} />
          <KontaktForm slug={key} interest={c.interest} done={c.done} layout="stack" slimDone />
        </>
      );
      break;
    case "modal":
      content = (
        <>
          <CtxFull c={c} />
          <div style={{ height: "16px" }} />
          <KontaktForm slug={key} interest={c.interest} done={c.done} layout="stack" />
        </>
      );
      break;
    default:
      content = null;
  }

  return (
    <section className={cls} aria-label={c.kicker}>
      {content}
    </section>
  );
}
