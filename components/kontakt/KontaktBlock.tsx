"use client";
// components/kontakt/KontaktBlock.tsx
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { KONTAKT_SLUGS, type KontaktSlug } from "@/content/kontakt-bloecke";
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
      if (match) {
        resolvedDynamicContext = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      }
    } else if (key === "news") {
      const match = pathWithoutLocale.match(/\/news\/([^\/]+)/);
      if (match) {
        // Simple heuristic for news title: remove hyphens, title case
        resolvedDynamicContext = match[1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
    }
  }

  // Try to use dynamicContext if available, otherwise fallback to plain translation
  const c: KontaktContent = {
    kicker: t(`${key}.kicker`),
    head: t(`${key}.head`),
    short: t(`${key}.short`),
    text: resolvedDynamicContext ? `${t(`${key}.text`)} — ${resolvedDynamicContext}` : t(`${key}.text`),
    interest: t(`${key}.interest`),
    done: t(`${key}.done`),
  };

  const cls = `kqk v-${variant} ${tone ? `t-${tone}` : ""}`;

  let content;
  switch (variant) {
    case "block":
      content = (
        <div className="kqk-grid">
          <CtxFull c={c} />
          <KontaktForm slug={key} interest={c.interest} done={c.done} layout="full" />
        </div>
      );
      break;
    case "band":
      content = (
        <div className="kqk-ctr">
          <CtxShort c={c} withPromise />
          <KontaktForm slug={key} interest={c.interest} done={c.done} layout="row" slimDone />
        </div>
      );
      break;
    case "hero":
      content = (
        <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
          <div className="kqk-h sh kqk-ctx w-full lg:flex-1 lg:min-w-[220px] text-center lg:text-left font-heading font-bold">{c.short}</div>
          <div className="kqk-right w-full lg:flex-[2]">
            <KontaktForm slug={key} interest={c.interest} done={c.done} layout="row" slimDone />
          </div>
        </div>
      );
      break;
    case "inline":
      content = (
        <div className="kqk-ctr">
          <CtxShort c={c} />
          <KontaktForm slug={key} interest={c.interest} done={c.done} layout="row" slimDone />
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
