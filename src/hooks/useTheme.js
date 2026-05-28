// src/hooks/useTheme.js
// Persists dark mode preference to localStorage.
// Applies dark class on <html> for proper TailwindCSS v4 integration.

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'zar3a-theme';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) return saved === 'dark';
    } catch {
      // localStorage may be unavailable (e.g., private browsing)
    }
    // Default: respect OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync dark class to <html> element and persist
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // Silently fail if localStorage is full or unavailable
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  return { isDark, toggleTheme };
}
