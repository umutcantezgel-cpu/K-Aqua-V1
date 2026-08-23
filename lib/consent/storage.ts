// Speicherzugriff mit vorgeschalteter Einwilligungsprüfung.
//
// Statt überall direkt localStorage anzusprechen, laufen abwählbare Speicher
// über diese Schicht. Ohne Einwilligung wird nicht geschrieben, und ein
// Widerruf räumt bereits Abgelegtes wieder ab. Damit hält die Website ein,
// was die Datenschutzerklärung zusagt.

import { hasConsent, subscribe } from './store';
import type { ConsentCategory } from './types';

/** Welcher Speicherschlüssel welcher Kategorie zugeordnet ist. */
const REGISTRY = new Map<string, ConsentCategory>();

export function registerStorageKey(key: string, category: ConsentCategory) {
  REGISTRY.set(key, category);
}

function isBrowser() {
  return typeof window !== 'undefined';
}

export function readItem(key: string, category: ConsentCategory): string | null {
  if (!isBrowser() || !hasConsent(category)) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Schreibt nur, wenn für die Kategorie eingewilligt wurde. Rückgabe: ob geschrieben wurde. */
export function writeItem(key: string, category: ConsentCategory, value: string): boolean {
  if (!isBrowser() || !hasConsent(category)) return false;
  try {
    registerStorageKey(key, category);
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeItem(key: string) {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignorieren
  }
}

export function readJson<T>(key: string, category: ConsentCategory, fallback: T): T {
  const raw = readItem(key, category);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, category: ConsentCategory, value: unknown): boolean {
  try {
    return writeItem(key, category, JSON.stringify(value));
  } catch {
    return false;
  }
}

/**
 * Entfernt alles, wofür die Einwilligung entzogen wurde. Wird bei jeder
 * Änderung ausgeführt — ein Widerruf soll nicht nur künftiges Schreiben
 * verhindern, sondern auch Vorhandenes beseitigen.
 */
function purgeWithdrawn() {
  if (!isBrowser()) return;
  for (const [key, category] of REGISTRY) {
    if (!hasConsent(category)) removeItem(key);
  }
}

let started = false;

/** Einmalig aus dem Layout starten. */
export function startStorageEnforcement() {
  if (started || !isBrowser()) return;
  started = true;
  purgeWithdrawn();
  subscribe(() => purgeWithdrawn());
}
