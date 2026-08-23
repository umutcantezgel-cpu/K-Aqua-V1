// Ablage und Verteilung des Einwilligungsstands.
//
// Eine Quelle, ein Ereignis: Wer den Stand braucht, liest ihn hier; wer ihn
// ändert, schreibt hier. Alle Abonnenten werden benachrichtigt, damit ein
// Widerruf sofort greift und nicht erst beim nächsten Seitenaufruf.

import {
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
  DEFAULT_DECISIONS,
  LEGACY_KEYS,
  type ConsentCategory,
  type ConsentDecisions,
  type ConsentRecord,
} from './types';

export const CONSENT_EVENT = 'kaqua:consent-changed';

let cached: ConsentRecord | null | undefined;

function isBrowser() {
  return typeof window !== 'undefined';
}

function readRaw(): ConsentRecord | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ConsentRecord;
      if (parsed && parsed.v === 2 && parsed.decisions) return parsed;
    }
  } catch {
    // Privatsphäre-Modi können localStorage sperren. Dann gilt: keine Einwilligung.
  }
  return migrateLegacy();
}

/**
 * Übernimmt eine Entscheidung aus der abgelösten Fassung, damit Besucher nicht
 * ohne Grund erneut gefragt werden. Die alte Fassung kannte 'analytics' und
 * 'marketing'; beide Dienste gab es nie, deshalb fließt nur die Zustimmung als
 * solche in die neue Kategorie 'comfort' ein.
 */
function migrateLegacy(): ConsentRecord | null {
  if (!isBrowser()) return null;
  try {
    const old = window.localStorage.getItem('k-aqua-cookie-consent');
    if (!old) return null;

    const accepted = old === 'all' || window.localStorage.getItem('cookie_analytics') === 'true';
    const record: ConsentRecord = {
      v: 2,
      ts: new Date().toISOString(),
      policyVersion: CONSENT_POLICY_VERSION,
      decisions: { ...DEFAULT_DECISIONS, comfort: accepted },
      via: 'banner',
    };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    for (const key of LEGACY_KEYS) window.localStorage.removeItem(key);
    return record;
  } catch {
    return null;
  }
}

/** Aktueller Nachweis, oder null wenn noch nie entschieden wurde. */
export function getConsentRecord(): ConsentRecord | null {
  if (cached === undefined) cached = readRaw();
  return cached;
}

/**
 * Gilt die vorliegende Entscheidung noch? Nach einer Änderung der
 * Datenschutzerklärung ist sie überholt und muss neu eingeholt werden.
 */
export function isConsentCurrent(): boolean {
  const record = getConsentRecord();
  return record !== null && record.policyVersion >= CONSENT_POLICY_VERSION;
}

export function getDecisions(): ConsentDecisions {
  const record = getConsentRecord();
  if (!record || record.policyVersion < CONSENT_POLICY_VERSION) return DEFAULT_DECISIONS;
  return { ...DEFAULT_DECISIONS, ...record.decisions, necessary: true };
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === 'necessary') return true;
  return getDecisions()[category] === true;
}

/** Entscheidung festhalten und alle Abonnenten benachrichtigen. */
export function saveConsent(
  decisions: Partial<Omit<ConsentDecisions, 'necessary'>>,
  via: ConsentRecord['via'] = 'banner'
): ConsentRecord {
  const record: ConsentRecord = {
    v: 2,
    ts: new Date().toISOString(),
    policyVersion: CONSENT_POLICY_VERSION,
    decisions: { ...DEFAULT_DECISIONS, ...decisions, necessary: true },
    via,
  };

  cached = record;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
      for (const key of LEGACY_KEYS) window.localStorage.removeItem(key);
    } catch {
      // Auch ohne Ablage soll die Entscheidung für diese Sitzung gelten.
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
  }
  return record;
}

/**
 * Widerruf: Der Nachweis wird gelöscht und alle abwählbaren Kategorien fallen
 * zurück. Art. 7 Abs. 3 DSGVO verlangt, dass das so einfach ist wie die
 * Erteilung.
 */
export function revokeConsent(): void {
  cached = null;
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    for (const key of LEGACY_KEYS) window.localStorage.removeItem(key);
  } catch {
    // ignorieren
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

/** Auf Änderungen hören. Gibt eine Abmeldefunktion zurück. */
export function subscribe(listener: (record: ConsentRecord | null) => void): () => void {
  if (!isBrowser()) return () => {};
  const handler = (event: Event) => listener((event as CustomEvent).detail ?? null);
  window.addEventListener(CONSENT_EVENT, handler);
  // Entscheidung in einem anderen Tab übernehmen
  const storageHandler = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) {
      cached = undefined;
      listener(getConsentRecord());
    }
  };
  window.addEventListener('storage', storageHandler);
  return () => {
    window.removeEventListener(CONSENT_EVENT, handler);
    window.removeEventListener('storage', storageHandler);
  };
}

/** Nur für Tests: zwingt das nächste Lesen zurück auf den Speicher. */
export function __resetCache() {
  cached = undefined;
}
