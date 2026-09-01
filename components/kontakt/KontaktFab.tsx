"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { KontaktBlock } from "./KontaktBlock";
import { type KontaktSlug } from "@/content/kontakt-bloecke";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";

export function KontaktFab() {
  const t = useTranslations("kontaktForm");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close when navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Strip locale for slug resolution on client
  const pathWithoutLocale = pathname ? pathname.replace(/^\/[a-z]{2}(\/|$)/, "/") : "";
  let slug: KontaktSlug = "fallback";
  if (pathWithoutLocale.startsWith("/academy")) slug = "academy";
  else if (pathWithoutLocale.startsWith("/referenzen")) slug = "referenzen";
  else if (pathWithoutLocale.startsWith("/ressourcen/support")) slug = "support";
  else if (pathWithoutLocale.startsWith("/ressourcen/ausschreibungstexte")) slug = "ausschreibungstexte";
  else if (pathWithoutLocale.startsWith("/service")) slug = "service";
  else if (pathWithoutLocale.startsWith("/maerkte/trinkwasser")) slug = "maerkte_trinkwasser";
  else if (pathWithoutLocale.startsWith("/maerkte/klimaanlagen")) slug = "maerkte_klima";
  else if (pathWithoutLocale.startsWith("/maerkte/industrie")) slug = "maerkte_industrie";
  else if (pathWithoutLocale.startsWith("/maerkte/schiffbau")) slug = "maerkte_schiffbau";
  else if (pathWithoutLocale.startsWith("/maerkte/landwirtschaft")) slug = "maerkte_landwirtschaft";
  else if (pathWithoutLocale.startsWith("/maerkte")) slug = "maerkte";
  else if (pathWithoutLocale.startsWith("/loesungen/hochhaus")) slug = "loesungen_hochhaus";
  else if (pathWithoutLocale.startsWith("/loesungen/krankenhaus")) slug = "loesungen_krankenhaus";
  else if (pathWithoutLocale.startsWith("/loesungen/hotel")) slug = "loesungen_hotel";
  else if (pathWithoutLocale.startsWith("/loesungen")) slug = "loesungen";
  else if (pathWithoutLocale.startsWith("/co2-rechner")) slug = "co2_rechner";
  else if (pathWithoutLocale.startsWith("/trust-center")) slug = "trust_center";
  else if (pathWithoutLocale.startsWith("/unternehmen")) slug = "unternehmen";

  return (
    <>
      {/* Premium Backdrop Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div 
            className="kqk-fab-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div 
        className={`v-fabwrap ${open ? "open" : ""}`}
        style={{ 
          pointerEvents: open ? "auto" : "none",
          touchAction: "none"
        }}
      >
        <AnimatePresence>
          {open && (
            <motion.div 
              className="kqk-fab-panel"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              style={{ pointerEvents: "auto" }}
            >
              <div className="kqk-mobile-handle" onClick={() => setOpen(false)} />
              <button className="kqk-close" type="button" aria-label={t("closeAria")} onClick={() => setOpen(false)}>
                <X size={18} strokeWidth={2.5} />
              </button>
              <div className="kqk-fab-scroll">
                <KontaktBlock variant="fab" slug={slug} tone="inverse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          className="kqk-fab" 
          type="button" 
          aria-label={t("fabAria")} 
          onClick={() => setOpen(!open)}
          style={{ pointerEvents: "auto" }}
        >
          <div className="kqk-fab-glow" />
          <MessageCircle className="icon-main" size={26} strokeWidth={2.5} />
          <X className="icon-close" size={26} strokeWidth={2.5} />
        </button>
      </div>
    </>
  );
}
