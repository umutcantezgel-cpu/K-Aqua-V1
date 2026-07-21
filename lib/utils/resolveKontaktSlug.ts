import { KontaktSlug } from "@/content/kontakt-bloecke";

export function resolveKontaktSlug(pathname: string | null): KontaktSlug {
  if (!pathname) return "fallback";

  // Strip locale (e.g. /de/maerkte -> /maerkte)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");

  // Exact matching or prefix matching
  if (pathWithoutLocale === "/" || pathWithoutLocale === "") return "home";
  if (pathWithoutLocale.startsWith("/unternehmen")) return "unternehmen";
  if (pathWithoutLocale.startsWith("/produkte/fittings")) return "produkte_fittings";
  if (pathWithoutLocale.startsWith("/produkte/pipes")) return "produkte_rohre";
  if (pathWithoutLocale.startsWith("/produkte/valves")) return "produkte_armaturen";
  if (pathWithoutLocale.startsWith("/produkte/tools")) return "produkte_werkzeuge";
  if (pathWithoutLocale.startsWith("/produkte/transition-fittings")) return "produkte_uebergaenge";
  if (pathWithoutLocale.startsWith("/produkte/accessories")) return "produkte_zubehoer";
  if (pathWithoutLocale.startsWith("/produkte")) return "katalog";
  if (pathWithoutLocale.startsWith("/produkte/finder")) return "finder";
  if (pathWithoutLocale.startsWith("/produkte")) return "produkte";
  if (pathWithoutLocale.startsWith("/academy")) return "academy";
  if (pathWithoutLocale.startsWith("/referenzen")) return "referenzen";
  if (pathWithoutLocale.startsWith("/ressourcen/support")) return "support";
  if (pathWithoutLocale.startsWith("/ressourcen/ausschreibungstexte")) return "ausschreibungstexte";
  if (pathWithoutLocale.startsWith("/service")) return "service";
  if (pathWithoutLocale.startsWith("/maerkte/trinkwasser")) return "maerkte_trinkwasser";
  if (pathWithoutLocale.startsWith("/maerkte/klimaanlagen")) return "maerkte_klima";
  if (pathWithoutLocale.startsWith("/maerkte/industrie")) return "maerkte_industrie";
  if (pathWithoutLocale.startsWith("/maerkte/schiffbau")) return "maerkte_schiffbau";
  if (pathWithoutLocale.startsWith("/maerkte/landwirtschaft")) return "maerkte_landwirtschaft";
  if (pathWithoutLocale.startsWith("/maerkte")) return "maerkte";
  if (pathWithoutLocale.startsWith("/loesungen/hochhaus")) return "loesungen_hochhaus";
  if (pathWithoutLocale.startsWith("/loesungen/krankenhaus")) return "loesungen_krankenhaus";
  if (pathWithoutLocale.startsWith("/loesungen/hotel")) return "loesungen_hotel";
  if (pathWithoutLocale.startsWith("/loesungen")) return "loesungen";
  if (pathWithoutLocale.startsWith("/co2-rechner")) return "co2_rechner";
  if (pathWithoutLocale.startsWith("/trust-center")) return "trust_center";
  if (pathWithoutLocale.startsWith("/projektanfrage")) return "projektanfrage";
  if (pathWithoutLocale.startsWith("/kontakt")) return "kontakt";
  if (pathWithoutLocale.startsWith("/news")) return "news";
  if (pathWithoutLocale.startsWith("/karriere")) return "karriere";
  if (pathWithoutLocale.startsWith("/partnerschaft")) return "partnerschaft";
  if (pathWithoutLocale.startsWith("/impressum")) return "impressum";
  if (pathWithoutLocale.startsWith("/datenschutz")) return "datenschutz";

  return "fallback";
}
