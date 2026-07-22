"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { KontaktBlock } from "./KontaktBlock";
import { type KontaktSlug } from "@/content/kontakt-bloecke";
import { usePathname } from "next/navigation";

export function KontaktModal() {
  const t = useTranslations("kontaktForm");
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState<KontaktSlug>("fallback");
  const pathname = usePathname();

  // Close when navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOpen = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest("[data-kaqua-open]");
      if (btn) {
        e.preventDefault();
        const s = btn.getAttribute("data-kaqua-open") as KontaktSlug | null;
        if (s) setSlug(s);
        setOpen(true);
      }
    };
    document.addEventListener("click", handleOpen);
    return () => document.removeEventListener("click", handleOpen);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className={`kqk-ovl on`}>
      <div className="bg" onClick={() => setOpen(false)}></div>
      <div style={{ position: "relative", zIndex: 1, width: "min(500px, 100%)", display: "grid", placeItems: "center" }}>
        <button className="kqk-close" type="button" aria-label={t("closeAria")} onClick={() => setOpen(false)} style={{ top: 16, right: 16 }}>x</button>
        <KontaktBlock variant="modal" slug={slug} tone="inverse" />
      </div>
    </div>
  );
}
