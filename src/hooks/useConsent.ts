"use client";

import { useState } from 'react';

type ConsentState = 'unknown' | 'accepted' | 'rejected';

const STORAGE_KEY = 'cojauny-studio-consent';

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => {
    if (typeof window === 'undefined') {
      return 'unknown';
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      return stored;
    }

    return 'unknown';
  });

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
  };

  const reject = () => {
    window.localStorage.setItem(STORAGE_KEY, 'rejected');
    setConsent('rejected');
  };

  return { consent, accept, reject };
}
