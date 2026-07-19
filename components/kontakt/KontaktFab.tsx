"use client";
import { useState, useEffect } from "react";
import { KontaktBlock } from "./KontaktBlock";
import { type KontaktSlug } from "@/content/kontakt-bloecke";
import { usePathname } from "next/navigation";

export function KontaktFab() {
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
    <div className={`v-fabwrap ${open ? "open" : ""}`}>
      {open && (
        <div style={{ position: "relative" }}>
          <button className="kqk-close" type="button" aria-label="Schliessen" onClick={() => setOpen(false)}>x</button>
          <KontaktBlock variant="fab" slug={slug} tone="inverse" />
        </div>
      )}
      <button className="kqk-fab" type="button" aria-label="Kontakt" onClick={() => setOpen(!open)}>
        <span className="kk">K</span>
        <span className="x1"></span>
        <span className="x2"></span>
      </button>
    </div>
  );
}
