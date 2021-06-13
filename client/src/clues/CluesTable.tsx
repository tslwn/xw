import { HTMLTable, Text } from '@blueprintjs/core';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './CluesTable.scss';
import { routes } from './clues-constants';
import { Clue } from './clues-interfaces';

interface CluesTableProps {
  clues: Clue[];
}

export default function CluesTable({ clues }: CluesTableProps) {
  const navigate = useNavigate();

  return (
    <HTMLTable className="clues-table" interactive>
      <tbody>
        {clues.map(({ answer, clue, id }, index) => (
          <tr
            key={id}
            onClick={() => {
              navigate(routes.clue(id));
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                navigate(routes.clue(id));
              }
            }}
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
