// src/hooks/useSelection.js
// Unified selection state via useReducer.
// Replaces 4 separate useState calls to prevent multi-render state updates.

import { useReducer, useCallback, useMemo } from 'react';

// ─── Action Types ────────────────────────────────────────────
const HOVER = 'HOVER';
const CLEAR_HOVER = 'CLEAR_HOVER';
const TOGGLE_PIN = 'TOGGLE_PIN';
const CLEAR_ALL = 'CLEAR_ALL';

// ─── Reducer ─────────────────────────────────────────────────
function selectionReducer(state, action) {
  switch (action.type) {
    case HOVER:
      // Don't allow hover when something is pinned
      if (state.pinned) return state;
      return { ...state, hovered: action.payload };

    case CLEAR_HOVER:
      if (state.pinned) return state;
      return { ...state, hovered: null };

    case TOGGLE_PIN: {
      const target = action.payload;
      // If clicking the same pinned element, unpin it
      if (
        state.pinned &&
        state.pinned.type === target.type &&
        state.pinned.id === target.id
      ) {
        return { hovered: null, pinned: null };
      }
      // Pin the new element, clear hover
      return { hovered: null, pinned: target };
    }

    case CLEAR_ALL:
      return { hovered: null, pinned: null };

    default:
      return state;
  }
}

const INITIAL_STATE = { hovered: null, pinned: null };

// ─── Hook ────────────────────────────────────────────────────
export function useSelection() {
  const [state, dispatch] = useReducer(selectionReducer, INITIAL_STATE);

  // Derived: the currently "active" element (pinned takes priority)
  const active = useMemo(
    () => state.pinned || state.hovered,
    [state.pinned, state.hovered]
  );

  const hover = useCallback((type, id) => {
    dispatch({ type: HOVER, payload: { type, id } });
  }, []);

  const clearHover = useCallback(() => {
    dispatch({ type: CLEAR_HOVER });
  }, []);

  const togglePin = useCallback((type, id) => {
    dispatch({ type: TOGGLE_PIN, payload: { type, id } });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: CLEAR_ALL });
  }, []);

  return {
    hovered: state.hovered,
    pinned: state.pinned,
    active,
    isPinned: state.pinned !== null,
    hover,
    clearHover,
    togglePin,
    clearAll,
  };
}
