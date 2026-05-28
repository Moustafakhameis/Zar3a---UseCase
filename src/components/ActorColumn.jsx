// src/components/ActorColumn.jsx
import { memo, useMemo } from 'react';
import { ACTORS } from '../data/umlData';
import { useDiagram } from '../context/DiagramContext';
import ActorNode from './ActorNode';

const ActorColumn = memo(function ActorColumn({ side }) {
  const { t } = useDiagram();

  const filteredActors = useMemo(
    () => ACTORS.filter((a) => a.side === side),
    [side]
  );

  return (
    <div
      className="flex flex-col justify-center gap-3 sm:gap-5 w-full sm:w-[13%] min-w-[120px] z-20"
      role="group"
      aria-label={`${side} actors`}
    >
      {filteredActors.map((actor) => (
        <ActorNode key={actor.id} actor={actor} label={t[actor.id]} />
      ))}
    </div>
  );
});

export default ActorColumn;
