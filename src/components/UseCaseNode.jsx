// src/components/UseCaseNode.jsx
import { memo, useCallback, useMemo } from 'react';
import { ACTOR_COLORS } from '../constants/theme';
import { ACTORS_BY_ID, getUseCaseRelationship } from '../data/umlData';
import { useDiagram } from '../context/DiagramContext';

const UseCaseNode = memo(function UseCaseNode({ useCase, language }) {
  const { active, pinned, hover, clearHover, togglePin, registerNode } = useDiagram();

  const relationship = useMemo(() => getUseCaseRelationship(useCase.id), [useCase.id]);
  const isChild = !!relationship;

  const isActive = active?.type === 'useCase' && active?.id === useCase.id;
  const isPinned = pinned?.type === 'useCase' && pinned?.id === useCase.id;

  let isDimmed = false;
  let highlightActorId = null;

  if (active) {
    if (active.type === 'actor') {
      if (useCase.actors.includes(active.id)) {
        highlightActorId = active.id;
      } else {
        isDimmed = true;
      }
    } else if (active.type === 'useCase' && active.id !== useCase.id) {
      isDimmed = true;
    }
  }

  // Visible default colors for BOTH modes
  let colorStyles = `
    bg-white dark:bg-slate-800
    border-slate-300 dark:border-slate-500
    text-slate-700 dark:text-slate-200
    hover:border-slate-400 dark:hover:border-slate-400
    hover:shadow-md
    shadow-sm
  `;

  if (highlightActorId) {
    const at = ACTOR_COLORS[highlightActorId];
    colorStyles = `${at.bg} ${at.border} text-slate-900 dark:text-white font-semibold shadow-md`;
  } else if (isActive) {
    colorStyles = 'bg-emerald-600 dark:bg-emerald-500 border-emerald-700 dark:border-emerald-400 text-white shadow-lg shadow-emerald-500/25';
  }

  const handleHover = useCallback(() => hover('useCase', useCase.id), [hover, useCase.id]);
  const handleClick = useCallback(() => togglePin('useCase', useCase.id), [togglePin, useCase.id]);
  const refCb = useCallback((el) => registerNode(useCase.id, el), [registerNode, useCase.id]);

  const showDots = !active;

  const actorRoles = useMemo(
    () => useCase.actors.map(a => ACTORS_BY_ID[a]?.role).filter(Boolean).join(', '),
    [useCase.actors]
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Include/Extend connector */}
      {isChild && (
        <div className="flex flex-col items-center">
          <div className={`h-4 border-l-2 border-dashed transition-colors duration-300
            ${highlightActorId ? 'border-emerald-500' : 'border-slate-400 dark:border-slate-500'}`} />
          <span className={`text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded transition-all duration-300
            ${isDimmed ? 'opacity-20' : 'opacity-100'}
            ${highlightActorId
              ? 'bg-emerald-600 text-white dark:bg-emerald-500 font-bold shadow-sm'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
            {relationship.tag}
          </span>
          <div className={`h-2 border-l-2 border-dashed transition-colors duration-300
            ${highlightActorId ? 'border-emerald-500' : 'border-slate-400 dark:border-slate-500'}`} />
        </div>
      )}

      {/* Use case ellipse */}
      <button
        ref={refCb}
        type="button"
        aria-label={`${useCase.label[language]} — ${actorRoles}`}
        aria-pressed={isPinned}
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={clearHover}
        onFocus={handleHover}
        onBlur={clearHover}
        className={`
          focus-ring relative cursor-pointer select-none
          flex items-center justify-center text-center
          rounded-[50%] border-2 font-medium
          transition-all duration-300 ease-out
          ${colorStyles}
          ${isDimmed ? 'opacity-20 scale-[0.96]' : 'opacity-100'}
          ${(isActive || highlightActorId) ? 'scale-[1.05] z-20' : 'scale-100'}
          ${isPinned ? 'ring-[3px] ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-emerald-500' : ''}
          ${isChild
            ? 'w-10/12 mx-auto border-dashed min-h-[2.8rem] px-3 py-1.5 text-[11px] sm:text-xs'
            : 'w-full min-h-[3.2rem] px-4 py-2 text-xs sm:text-[13px]'
          }
        `}
      >
        <span className="leading-snug">{useCase.label[language]}</span>

        {showDots && (
          <div className="absolute -bottom-1.5 flex gap-0.5
            bg-white dark:bg-slate-800
            px-1.5 py-0.5 rounded-full
            border border-slate-200 dark:border-slate-600
            shadow-sm" aria-hidden="true">
            {useCase.actors.map((actId) => {
              const at = ACTOR_COLORS[actId];
              return (
                <div key={actId} className={`w-1.5 h-1.5 rounded-full ${at?.dotBg}`} title={actId} />
              );
            })}
          </div>
        )}
      </button>
    </div>
  );
});

export default UseCaseNode;
