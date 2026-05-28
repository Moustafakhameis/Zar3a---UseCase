// src/hooks/useLanguage.js
// Persists language preference. Syncs <html> lang and dir attributes.

import { useState, useCallback, useMemo, useEffect } from 'react';
import { TRANSLATIONS } from '../data/umlData';

const STORAGE_KEY = 'zar3a-language';

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch { /* noop */ }
    return 'ar';
  });

  // Sync <html> lang and dir attributes for screen readers and CSS
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const next = prev === 'ar' ? 'en' : 'ar';
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* noop */ }
      return next;
    });
  }, []);

  const t = useMemo(() => TRANSLATIONS[language], [language]);
  const isRTL = language === 'ar';

  return { language, toggleLanguage, t, isRTL };
}
