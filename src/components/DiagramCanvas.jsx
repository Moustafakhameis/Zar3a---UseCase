// src/components/DiagramCanvas.jsx
// Main diagram layout — premium glassmorphism system boundary.
// Perfectly supports horizontal scrolling without clipping the top boundary pill or displacing relationship lines.

import { memo } from 'react';
import { Settings, Sprout } from 'lucide-react';
import { useDiagram } from '../context/DiagramContext';
import ActorColumn from './ActorColumn';
import UseCaseColumn from './UseCaseColumn';
import RelationshipLines from './RelationshipLines';

const DiagramCanvas = memo(function DiagramCanvas() {
  const { containerRef, isRTL, t } = useDiagram();

  return (
    <div
      className="relative w-full max-w-7xl mx-auto pb-8 z-20"
      role="img"
      aria-label={`UML Use Case Diagram — ${t.systemBoundary}`}
    >
      {/* Scrollable container with top padding pt-6 to completely prevent absolute pill clipping */}
      <div className="overflow-x-auto pt-6 pb-2">
        <div
          ref={containerRef}
          className="min-w-[920px] flex items-stretch gap-3 sm:gap-5 px-4 sm:px-6 relative"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          {/* Left actors */}
          <ActorColumn side="left" />

          {/* ─── System Boundary Frame ─── */}
          <div
            className="relative grow
              border-[3px] border-dashed
              border-slate-400/80 dark:border-slate-500
              bg-white/60 dark:bg-slate-900/70
              rounded-3xl p-4 sm:p-6
              shadow-[0_0_40px_-8px_rgba(16,185,129,0.12)]
              dark:shadow-[0_0_50px_-8px_rgba(16,185,129,0.08)]
              backdrop-blur-sm
              transition-all duration-500"
            role="group"
            aria-label={t.systemBoundary}
          >
            {/* System boundary label pill - z-30 inside system boundary, completely visible */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
              <div className="flex items-center gap-2 px-5 py-1.5
                bg-gradient-to-r from-emerald-600 to-teal-600
                dark:from-emerald-500 dark:to-teal-500
                text-white rounded-full font-bold
                shadow-lg shadow-emerald-600/30 dark:shadow-emerald-500/20
                text-xs sm:text-sm whitespace-nowrap">
                <Settings size={14} className="animate-spin-slow" />
                {t.systemBoundary}
              </div>
            </div>

            {/* Use case columns inside boundary */}
            <div className="flex flex-row justify-between gap-3 sm:gap-4 h-full pt-3 relative z-10"
              style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
              <UseCaseColumn group="left" />
              <UseCaseColumn group="center" />
              <UseCaseColumn group="right" />
            </div>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.04] pointer-events-none z-0" aria-hidden="true">
              <Sprout size={260} className="text-emerald-700 dark:text-emerald-400" />
            </div>
          </div>

          {/* Right actors */}
          <ActorColumn side="right" />

          {/* SVG Relationship lines overlay sits directly inside scrollable area to scroll seamlessly with actors and use cases */}
          <RelationshipLines />
        </div>
      </div>
    </div>
  );
});

export default DiagramCanvas;
