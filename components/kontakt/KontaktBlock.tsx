// components/kontakt/KontaktBlock.tsx
import { useTranslations } from "next-intl";
import { KONTAKT_SLUGS, type KontaktSlug } from "@/content/kontakt-bloecke";
import { KontaktForm } from "./KontaktForm";

export type KontaktVariant = "block" | "band" | "hero" | "inline" | "row" | "sidebar" | "tile" | "sticky" | "fab" | "modal";
export type KontaktTone = "primary" | "glass" | "inverse" | "";

interface Props {
  slug?: KontaktSlug;
  variant?: KontaktVariant;
  tone?: KontaktTone;
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
    <div className="kqk-ctx">
      <div className="kqk-k">{c.kicker}</div>
      <h2 className="kqk-h">{c.head}</h2>
      <p className="kqk-t">{c.text}</p>
      <Promise_ />
    </div>
  );
}

function CtxShort({ c, withPromise }: { c: KontaktContent, withPromise?: boolean }) {
  return (
    <div className="kqk-ctx">
      <div className="kqk-k">{c.kicker}</div>
      <h2 className="kqk-h sh">{c.short}</h2>
      {withPromise && <Promise_ />}
    </div>
  );
}

export function KontaktBlock({ slug = "fallback", variant = "block", tone = "" }: Props) {
  const t = useTranslations("kontaktBlocks");
  const key: KontaktSlug = (KONTAKT_SLUGS as readonly string[]).includes(slug) ? slug : "fallback";
  const c: KontaktContent = {
    kicker: t(`${key}.kicker`),
    head: t(`${key}.head`),
    short: t(`${key}.short`),
    text: t(`${key}.text`),
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
        <div className="kqk-ctr" style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
          <h2 className="kqk-h sh kqk-ctx" style={{ flex: 1, minWidth: "220px" }}>{c.short}</h2>
          <div className="kqk-right" style={{ flex: 2 }}>
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
