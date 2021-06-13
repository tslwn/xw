import { HTMLTable, Text } from '@blueprintjs/core';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './CluesTable.scss';
import { routes } from './clues-constants';
import { Clue } from './clues-interfaces';

function useCluesTable() {
  const navigate = useNavigate();

  const handleClueClick = (id: number) => (event: React.MouseEvent) => {
    navigate(routes.clue(id));
  };

  const handleClueKeyDown = (id: number) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      navigate(routes.clue(id));
    }
  };

  return { handleClueClick, handleClueKeyDown };
}

interface CluesTableProps {
  clues: Clue[];
}

export default function CluesTable({ clues }: CluesTableProps) {
  const { handleClueClick, handleClueKeyDown } = useCluesTable();

  return (
    <HTMLTable className="clues-table" interactive>
      <tbody>
        {clues.map(({ answer, clue, id }, index) => (
          <tr
            key={id}
            onClick={handleClueClick(id)}
            onKeyDown={handleClueKeyDown(id)}
            tabIndex={0}
          >
            <td className={index === 0 ? 'clues-table__answer' : undefined}>
              <Text ellipsize>{answer}</Text>
            </td>
            <td>
              <Text ellipsize>{clue}</Text>
            </td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
}
