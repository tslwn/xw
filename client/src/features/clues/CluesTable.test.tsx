import * as React from 'react';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import data from '../../test/clues-data';
import { render, screen, userEvent } from '../../test/test-utils';
import CluesTable from './CluesTable';

function Clue() {
  const { id } = useParams();

  return <div>{`Navigated to ID ${id}`}</div>;
}

function renderCluesTable(options?: Parameters<typeof render>[1]) {
  const path = '/clues-table';

  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/clues/:id" element={<Clue />} />
        <Route path={path} element={<CluesTable clues={data} />} />
      </Routes>
    </MemoryRouter>,
    options
  );
}

test('it renders', async () => {
  await renderCluesTable();

  data.forEach(({ answer, clue }) => {
    expect(screen.getByText(answer)).toBeInTheDocument();

    if (clue !== undefined) {
      expect(screen.getByText(clue)).toBeInTheDocument();
    }
  });
});

test('it navigates on click', async () => {
  await renderCluesTable();

  const [firstRow] = screen.getAllByRole('row');

  userEvent.click(firstRow);

  await screen.findByText(`Navigated to ID ${data[0].id}`);
});

test('it tabs to row and navigates on enter', async () => {
  await renderCluesTable();

  expect(document.body).toHaveFocus();

  const [firstRow, secondRow] = screen.getAllByRole('row');

  userEvent.tab();

  expect(firstRow).toHaveFocus();

  userEvent.tab();

  expect(secondRow).toHaveFocus();

  if (document.activeElement === null) {
    throw new Error();
  }

  userEvent.type(document.activeElement, '{enter}');

  await screen.findByText(`Navigated to ID ${data[1].id}`);
});
