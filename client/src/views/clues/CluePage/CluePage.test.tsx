import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest, server } from 'src/test/server';
import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from 'src/test/utils';
import { CluePage, paths } from 'src/views/clues';

function renderCluePage(id: number, options?: Parameters<typeof render>[1]) {
  return render(
    <MemoryRouter initialEntries={[paths.clue(id)]}>
      <Routes>
        <Route path={paths.clue()} element={<CluePage />} />
      </Routes>
    </MemoryRouter>,
    options
  );
}

test('it renders idle state', async () => {
  await renderCluePage(1, {
    defaultOptions: {
      queries: {
        enabled: false,
      },
    },
  });

  expect(screen.getByTitle(/offline/i)).toBeInTheDocument();

  const retryButton = screen.getByRole('button', { name: /retry/i });

  // clicking retry should refetch query
  userEvent.click(retryButton);

  await screen.findByTestId('spinner');
});

test('it renders loading state', async () => {
  await renderCluePage(1);

  expect(screen.getByTestId('spinner')).toBeInTheDocument();

  const cancelButton = screen.getByRole('button', { name: /cancel/i });

  // clicking cancel should disable query
  userEvent.click(cancelButton);

  await screen.findByTitle(/offline/i);
});

test('it renders error state', async () => {
  server.use(rest.get('*', async (req, res, ctx) => res(ctx.status(500))));

  await renderCluePage(1);

  await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

  expect(screen.getByText(/an error occurred./i)).toBeInTheDocument();

  const retryButton = screen.getByRole('button', { name: /retry/i });

  server.resetHandlers();

  // clicking retry should refetch query
  userEvent.click(retryButton);

  await screen.findByTestId('spinner');
});

test('it renders success state', async () => {
  await renderCluePage(1);

  await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

  expect(screen.getByRole('heading', { name: /carroty/i })).toBeInTheDocument();

  const clue = screen.getByRole('textbox', { name: /clue/i });

  expect(clue).toHaveDisplayValue('Orange books in lift');

  const notes = screen.getByRole('textbox', { name: /notes/i });

  expect(notes).toHaveDisplayValue('CARR<O(ld)/T(estament)>Y');
});
