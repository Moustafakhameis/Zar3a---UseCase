// src/components/RelationshipLines.jsx
// SVG overlay drawing curved connection lines between actors and use cases.

import { memo, useState, useEffect, useCallback } from 'react';
import { useDiagram } from '../context/DiagramContext';
import { USE_CASES, ACTORS_BY_ID } from '../data/umlData';
import { ACTOR_COLORS } from '../constants/theme';

function generateCurvePath(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1) * 0.35;
  const cp1x = x1 < x2 ? x1 + dx : x1 - dx;
  const cp2x = x1 < x2 ? x2 - dx : x2 + dx;
  return `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
}

const RelationshipLines = memo(function RelationshipLines() {
  const { active, containerRef, nodeRefs } = useDiagram();
  const [lines, setLines] = useState([]);

  const recalculate = useCallback(() => {
    const container = containerRef.current;
    if (!container || !active) {
      setLines([]);
      return;
    }

    const cr = container.getBoundingClientRect();
    const result = [];

    const getLineData = (actorId, ucId) => {
      const actEl = nodeRefs.current.get(actorId);
      const ucEl = nodeRefs.current.get(ucId);
      if (!actEl || !ucEl) return null;

      const ar = actEl.getBoundingClientRect();
      const ur = ucEl.getBoundingClientRect();
      const actObj = ACTORS_BY_ID[actorId];

      const ay = ar.top + ar.height / 2 - cr.top;
      const ax = actObj?.side === 'left'
        ? ar.right - cr.left
        : ar.left - cr.left;

      const uy = ur.top + ur.height / 2 - cr.top;
      const ucx = ur.left + ur.width / 2 - cr.left;
      const ux = ax < ucx ? ur.left - cr.left : ur.right - cr.left;

      return {
        id: `${actorId}-${ucId}`,
        path: generateCurvePath(ax, ay, ux, uy),
        color: ACTOR_COLORS[actorId]?.lineColor || '#94a3b8',
        dimColor: ACTOR_COLORS[actorId]?.lineColorDim || 'rgba(148,163,184,0.1)',
      };
    };

    if (active.type === 'actor') {
      USE_CASES.filter(uc => uc.actors.includes(active.id)).forEach(uc => {
        const data = getLineData(active.id, uc.id);
        if (data) result.push(data);
      });
    } else if (active.type === 'useCase') {
      const uc = USE_CASES.find(u => u.id === active.id);
      if (uc) {
        uc.actors.forEach(actorId => {
          const data = getLineData(actorId, active.id);
          if (data) result.push(data);
        });
      }
    }

    setLines(result);
  }, [active, containerRef, nodeRefs]);

  useEffect(() => {
    const raf = requestAnimationFrame(recalculate);
    return () => cancelAnimationFrame(raf);
  }, [recalculate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    const handler = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(recalculate);
    };

    const observer = new ResizeObserver(handler);
    observer.observe(container);
    window.addEventListener('resize', handler, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handler);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef, recalculate]);

  if (lines.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5, overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* Glow layer */}
      {lines.map((line) => (
        <path
          key={`glow-${line.id}`}
          d={line.path}
          stroke={line.color}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          opacity={0.08}
          className="animate-draw-line"
        />
      ))}
      {/* Main lines */}
      {lines.map((line) => (
        <path
          key={line.id}
          d={line.path}
          stroke={line.color}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          opacity={0.5}
          className="animate-draw-line"
        />
      ))}
    </svg>
  );
});

export default RelationshipLines;
