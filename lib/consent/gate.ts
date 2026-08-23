// Sperre für einwilligungspflichtige Dienste.
//
// Die Datenschutzerklärung sagt zu, künftige Analyse-Dienste würden
// "ausschließlich nach Ihrer Einwilligung geladen". Diese Datei ist die
// technische Einlösung dieser Zusage: Wer einen Dienst hier anmeldet, wird
// erst nach Einwilligung gestartet und bei Widerruf wieder abgeräumt.
//
// Beispiel:
//   registerService({
//     id: 'matomo',
//     category: 'analytics',
//     name: 'Matomo',
//     provider: 'K-Aqua (eigener Server)',
//     purpose: 'Reichweitenmessung',
//     retention: '13 Monate',
//     start: () => { const s = document.createElement('script'); … return () => s.remove(); },
//   });

import { hasConsent, subscribe } from './store';
import type { ConsentCategory } from './types';

export interface ConsentService {
  id: string;
  category: Exclude<ConsentCategory, 'necessary'>;
  /** Anzeigename im Dienstverzeichnis des Dialogs. */
  name: string;
  provider: string;
  purpose: string;
  /** Speicherdauer im Klartext, z. B. "13 Monate". */
  retention: string;
  /** Drittlandtransfer, falls vorhanden. Leer lassen, wenn keiner stattfindet. */
  thirdCountry?: string;
  /** Startet den Dienst. Der Rückgabewert räumt ihn bei Widerruf wieder ab. */
  start: () => void | (() => void);
}

const services = new Map<string, ConsentService>();
const running = new Map<string, (() => void) | void>();

/**
 * Meldet einen Dienst an. Er startet sofort, falls bereits eingewilligt wurde,
 * sonst beim Erteilen der Einwilligung.
 */
export function registerService(service: ConsentService) {
  services.set(service.id, service);
  sync();
}

/** Alle angemeldeten Dienste — speist das Verzeichnis im Einwilligungsdialog. */
export function getServices(): ConsentService[] {
  return [...services.values()];
}

/**
 * Kategorien, für die tatsächlich ein Dienst angemeldet ist. Der Dialog blendet
 * leere Kategorien aus: Nach etwas zu fragen, das es nicht gibt, wäre irreführend.
 */
export function getActiveCategories(): Set<ConsentCategory> {
  const active = new Set<ConsentCategory>(['necessary']);
  for (const service of services.values()) active.add(service.category);
  return active;
}

function sync() {
  for (const [id, service] of services) {
    const allowed = hasConsent(service.category);
    const isRunning = running.has(id);

    if (allowed && !isRunning) {
      try {
        running.set(id, service.start());
      } catch (error) {
        console.error(`[consent] Dienst "${id}" konnte nicht gestartet werden:`, error);
      }
    } else if (!allowed && isRunning) {
      const stop = running.get(id);
      try {
        if (typeof stop === 'function') stop();
      } catch (error) {
        console.error(`[consent] Dienst "${id}" konnte nicht gestoppt werden:`, error);
      }
      running.delete(id);
    }
  }
}

/** Führt eine Funktion aus, sobald für die Kategorie eingewilligt wurde. */
export function whenGranted(category: ConsentCategory, fn: () => void): () => void {
  if (hasConsent(category)) {
    fn();
    return () => {};
  }
  const unsubscribe = subscribe(() => {
    if (hasConsent(category)) {
      fn();
      unsubscribe();
    }
  });
  return unsubscribe;
}

let started = false;

/** Einmalig aus dem Layout starten. */
export function startConsentGate() {
  if (started || typeof window === 'undefined') return;
  started = true;
  sync();
  subscribe(() => sync());
}
