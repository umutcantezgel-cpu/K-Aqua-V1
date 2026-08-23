'use client';

// Startet die Einwilligungsschicht einmal pro Seitenaufruf.
//
// Zwei Aufgaben: angemeldete Dienste erst nach Einwilligung starten und bei
// Widerruf wieder abräumen (gate), sowie abwählbare Speichereinträge bei
// Widerruf entfernen (storage).

import { useEffect } from 'react';
import { startConsentGate } from '@/lib/consent/gate';
import { registerStorageKey, startStorageEnforcement } from '@/lib/consent/storage';

export function ConsentInitializer() {
  useEffect(() => {
    // Der Theme-Schlüssel wird von next-themes geschrieben, nicht von unserem
    // Code — deshalb hier anmelden, damit ein Widerruf ihn trotzdem abräumt.
    registerStorageKey('theme', 'comfort');
    registerStorageKey('kaqua-co2-coach-v1', 'comfort');
    registerStorageKey('kaqua-co2-scenarios-v1', 'comfort');
    registerStorageKey('kaqua-co2-portfolio-v1', 'comfort');
    registerStorageKey('kaqua_recent_searches', 'comfort');

    startConsentGate();
    startStorageEnforcement();
  }, []);

  return null;
}
