// src/pages/Zar3aUML.jsx
import { MousePointerClick } from 'lucide-react';
import { useDiagram } from '../context/DiagramContext';
import FloatingBackground from '../components/FloatingBackground';
import ToolBar from '../components/ToolBar';
import DiagramCanvas from '../components/DiagramCanvas';
import DiagramLegend from '../components/DiagramLegend';

export default function Zar3aUML() {
  const { t, isRTL, isPinned, clearAll } = useDiagram();

  return (
    <div
      className="min-h-screen
        bg-[#fdfcf8] dark:bg-[#020617]
        transition-colors duration-700
        flex flex-col items-center overflow-x-hidden relative"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Cinematic Background */}
      <FloatingBackground />

      {/* Top Controls */}
      <header className="w-full max-w-7xl flex justify-end items-center px-3 sm:px-6 pt-3 sm:pt-5 pb-2 relative z-30">
        <ToolBar />
      </header>

      {/* Header Section */}
      <div className="text-center px-4 mb-4 sm:mb-6 w-full max-w-7xl relative z-30">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-1.5 tracking-tight leading-tight">
          {t.title}{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
            {t.architecture}
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-xs sm:text-sm">
          {t.subtitle}
        </p>

        {/* Instruction bar */}
        <div className="mt-3 sm:mt-4 inline-flex items-center gap-2
          bg-white/90 dark:bg-slate-800/90
          px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm
          text-[11px] sm:text-xs text-slate-600 dark:text-slate-300
          border border-slate-200 dark:border-slate-700">
          <MousePointerClick size={14} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
          <span>{t.instruction}</span>
          {isPinned && (
            <button
              onClick={clearAll}
              className="focus-ring ms-1 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full
                bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400
                hover:bg-red-200 dark:hover:bg-red-800/50
                transition-colors duration-200 shrink-0"
              aria-label={t.clearSelection}
            >
              {t.clearSelection}
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-3 sm:mb-4 relative z-30 px-4">
        <DiagramLegend />
      </div>

      {/* Main Diagram */}
      <main className="w-full px-2 sm:px-4">
        <DiagramCanvas />
      </main>

      {/* Footer spacing */}
      <div className="h-8 sm:h-12" />

      {/* Screen Reader Announcement */}
      <div aria-live="polite" className="sr-only">
        {isPinned && t.instruction}
      </div>
    </div>
  );
}
