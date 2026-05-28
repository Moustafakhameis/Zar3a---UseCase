// src/components/UseCaseColumn.jsx
import { memo, useMemo } from 'react';
import { USE_CASES } from '../data/umlData';
import { useDiagram } from '../context/DiagramContext';
import UseCaseNode from './UseCaseNode';

const UseCaseColumn = memo(function UseCaseColumn({ group }) {
  const { language } = useDiagram();

  const filtered = useMemo(
    () => USE_CASES.filter((uc) => uc.group === group),
    [group]
  );

  return (
    <div className={`flex flex-col gap-2 ${group === 'center' ? 'w-full sm:w-[28%]' : 'w-full sm:w-[34%]'}`}>
      {group === 'center' && <div className="hidden sm:block h-6" />}
      {filtered.map((uc) => (
        <UseCaseNode key={uc.id} useCase={uc} language={language} />
      ))}
    </div>
  );
});

export default UseCaseColumn;
