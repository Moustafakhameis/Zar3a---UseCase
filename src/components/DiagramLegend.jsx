// src/components/DiagramLegend.jsx
import { memo } from 'react';
import { ACTORS } from '../data/umlData';
import { ACTOR_COLORS } from '../constants/theme';
import { useDiagram } from '../context/DiagramContext';

const DiagramLegend = memo(function DiagramLegend() {
  const { t } = useDiagram();

  return (
    <div
      className="inline-flex flex-wrap items-center gap-2.5 sm:gap-3
        bg-white/90 dark:bg-slate-800/90
        backdrop-blur-md
        px-4 py-2.5 rounded-2xl shadow-sm
        border border-slate-200 dark:border-slate-700
        transition-all duration-300"
      role="group"
      aria-label={t.legend}
    >
      <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
        {t.legend}
      </span>
      <div className="w-px h-3.5 bg-slate-200 dark:bg-slate-600" aria-hidden="true" />
      {ACTORS.map((actor) => {
        const theme = ACTOR_COLORS[actor.id];
        return (
          <div key={actor.id} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${theme.dotBg} shadow-sm`} />
            <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium">
              {t[actor.id]}
            </span>
          </div>
        );
      })}
    </div>
  );
});

export default DiagramLegend;
