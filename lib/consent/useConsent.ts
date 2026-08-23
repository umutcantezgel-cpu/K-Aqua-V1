'use client';

// React-Zugang zum Einwilligungsstand.

import { useCallback, useEffect, useState } from 'react';
import {
  getDecisions,
  isConsentCurrent,
  revokeConsent,
  saveConsent,
  subscribe,
} from './store';
import type { ConsentCategory, ConsentDecisions, ConsentRecord } from './types';

export interface UseConsent {
  decisions: ConsentDecisions;
  /** Liegt eine Entscheidung zur aktuellen Fassung vor? */
  decided: boolean;
  has: (category: ConsentCategory) => boolean;
  save: (
    decisions: Partial<Omit<ConsentDecisions, 'necessary'>>,
    via?: ConsentRecord['via']
  ) => void;
  revoke: () => void;
}

export function useConsent(): UseConsent {
  // Serverseitig ist der Stand unbekannt; erst nach dem Einhängen lesen, sonst
  // weicht das Markup vom Server ab und React meldet einen Hydration-Fehler.
  const [decisions, setDecisions] = useState<ConsentDecisions>(() => ({
    necessary: true,
    comfort: false,
    analytics: false,
  }));
  const [decided, setDecided] = useState(true);

  useEffect(() => {
    const read = () => {
      setDecisions(getDecisions());
      setDecided(isConsentCurrent());
    };
    read();
    return subscribe(read);
  }, []);

  const has = useCallback(
    (category: ConsentCategory) => category === 'necessary' || decisions[category] === true,
    [decisions]
  );

  const save = useCallback(
    (next: Partial<Omit<ConsentDecisions, 'necessary'>>, via: ConsentRecord['via'] = 'banner') => {
      saveConsent(next, via);
    },
    []
  );

  const revoke = useCallback(() => revokeConsent(), []);

  return { decisions, decided, has, save, revoke };
}
