// src/context/DiagramContext.jsx
// Unified state provider — memoized value to prevent unnecessary re-renders.

import { createContext, useContext, useRef, useCallback, useMemo } from 'react';
import { useSelection } from '../hooks/useSelection';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

const DiagramContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useDiagram() {
  const ctx = useContext(DiagramContext);
  if (!ctx) {
    throw new Error('useDiagram must be used within a <DiagramProvider>');
  }
  return ctx;
}

export function DiagramProvider({ children }) {
  const selection = useSelection();
  const theme = useTheme();
  const language = useLanguage();

  const nodeRefs = useRef(new Map());
  const containerRef = useRef(null);

  const registerNode = useCallback((id, element) => {
    if (element) {
      nodeRefs.current.set(id, element);
    } else {
      nodeRefs.current.delete(id);
    }
  }, []);

  // Memoize context value to prevent re-renders when refs change
  // Only triggers consumer re-renders when actual state values change
  const value = useMemo(() => ({
    // Selection state
    hovered: selection.hovered,
    pinned: selection.pinned,
    active: selection.active,
    isPinned: selection.isPinned,
    hover: selection.hover,
    clearHover: selection.clearHover,
    togglePin: selection.togglePin,
    clearAll: selection.clearAll,
    // Theme
    isDark: theme.isDark,
    toggleTheme: theme.toggleTheme,
    // Language
    language: language.language,
    toggleLanguage: language.toggleLanguage,
    t: language.t,
    isRTL: language.isRTL,
    // Node registration (stable refs)
    nodeRefs,
    containerRef,
    registerNode,
  }), [
    selection.hovered, selection.pinned, selection.active, selection.isPinned,
    selection.hover, selection.clearHover, selection.togglePin, selection.clearAll,
    theme.isDark, theme.toggleTheme,
    language.language, language.toggleLanguage, language.t, language.isRTL,
    registerNode,
  ]);

  return (
    <DiagramContext.Provider value={value}>
      {children}
    </DiagramContext.Provider>
  );
}
