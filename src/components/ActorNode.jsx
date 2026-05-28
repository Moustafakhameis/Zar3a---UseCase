// src/components/ActorNode.jsx
import { memo, useCallback, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ACTOR_COLORS } from '../constants/theme';
import { USE_CASES_BY_ID } from '../data/umlData';
import { useDiagram } from '../context/DiagramContext';

const ActorNode = memo(function ActorNode({ actor, label }) {
  const { active, pinned, hover, clearHover, togglePin, registerNode } = useDiagram();

  const theme = ACTOR_COLORS[actor.id];
  const Icon = actor.icon;

  const isActive = active?.type === 'actor' && active?.id === actor.id;
  const isPinned = pinned?.type === 'actor' && pinned?.id === actor.id;

  const isDimmed = useMemo(() => {
    if (!active) return false;
    if (active.type === 'actor' && active.id !== actor.id) return true;
    if (active.type === 'useCase') {
      const uc = USE_CASES_BY_ID[active.id];
      return !uc?.actors.includes(actor.id);
    }
    return false;
  }, [active, actor.id]);

  const handleHover = useCallback(() => hover('actor', actor.id), [hover, actor.id]);
  const handleClick = useCallback(() => togglePin('actor', actor.id), [togglePin, actor.id]);
  const refCb = useCallback((el) => registerNode(actor.id, el), [registerNode, actor.id]);

  return (
    <button
      ref={refCb}
      type="button"
      aria-label={`${label} — ${actor.role}`}
      aria-pressed={isPinned}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={clearHover}
      onFocus={handleHover}
      onBlur={clearHover}
      className={`
        focus-ring relative flex flex-col items-center gap-1.5 p-3 sm:p-4
        rounded-2xl border-2 w-full cursor-pointer select-none
        transition-all duration-300 ease-out
        shadow-sm hover:shadow-md
        ${theme.bg} ${theme.border} ${theme.hoverBg}
        ${isDimmed ? 'opacity-25 scale-[0.97]' : 'opacity-100'}
        ${isActive ? 'scale-[1.06] shadow-xl ring-2 ring-emerald-400/50' : 'scale-100'}
        ${isPinned ? 'ring-[3px] ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-emerald-500 animate-pulse-glow' : ''}
      `}
    >
      {isPinned && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2
          bg-emerald-500 text-white rounded-full p-0.5 shadow-lg z-30
          border-2 border-white dark:border-slate-900
          animate-[scale-in_0.2s_ease-out]">
          <CheckCircle2 size={14} />
        </div>
      )}

      <div className={`p-2.5 sm:p-3 rounded-xl
        bg-white dark:bg-slate-800
        shadow-sm border border-slate-100 dark:border-slate-700
        ${theme.color}`}>
        <Icon size={26} strokeWidth={1.8} />
      </div>

      <span className="font-bold text-slate-800 dark:text-slate-100 text-[13px] sm:text-sm text-center leading-snug">
        {label}
      </span>

      <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-medium">
        {actor.role}
      </span>
    </button>
  );
});

export default ActorNode;
