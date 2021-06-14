import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import clues from '../test/clues-data';
import { rest, server } from '../test/setup-server';
import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from '../test/test-utils';
import CluesScreen from './CluesScreen';

function SomewhereElse() {
  return <h1>Somewhere else</h1>;
}

function renderCluesScreen(options?: Parameters<typeof render>[1]) {
  return render(
    <MemoryRouter initialEntries={['/clues']}>
      <Routes>
        <Route path="/clues/new" element={<SomewhereElse />} />
        <Route path="/clues" element={<CluesScreen />} />
      </Routes>
    </MemoryRouter>,
    options
  );
}

test('it renders idle state', async () => {
  await renderCluesScreen({
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
  await renderCluesScreen();

  expect(screen.getByTestId('spinner')).toBeInTheDocument();

  const cancelButton = screen.getByRole('button', { name: /cancel/i });

  // clicking cancel should disable query
  userEvent.click(cancelButton);

  await screen.findByTitle(/offline/i);
});

test('it renders error state', async () => {
  server.use(rest.get('*', async (req, res, ctx) => res(ctx.status(500))));

  await renderCluesScreen();

  await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

  expect(screen.getByText(/an error occurred./i)).toBeInTheDocument();

  const retryButton = screen.getByRole('button', { name: /retry/i });

  server.resetHandlers();

  // clicking retry should refetch query
  userEvent.click(retryButton);

  await screen.findByTestId('spinner');
});

test('it renders success state', async () => {
  await renderCluesScreen();

  await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

  expect(
    screen.getByRole('textbox', { name: /search clues/i })
  ).toBeInTheDocument();

  const createLink = screen.getByRole('link', { name: /create/i });

  // should return all rows
  expect(screen.getAllByRole('row').length).toBe(clues.length);

  clues.forEach(({ answer, clue }) => {
    expect(screen.getByText(answer)).toBeInTheDocument();

    if (clue !== undefined) {
      expect(screen.getByText(clue)).toBeInTheDocument();
    }
  });

  // clicking link should navigate to "/new"
  userEvent.click(createLink);

  await screen.findByRole('heading', { name: /somewhere else/i });
});

test('it searches for clues', async () => {
  await renderCluesScreen();

  await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

  // should return all rows
  expect(screen.getAllByRole('row').length).toBe(clues.length);

  const searchInput = screen.getByRole('textbox', { name: /search clues/i });

  // typing into search input should fetch new query
  userEvent.type(searchInput, 'spare');

  await screen.findByTestId('spinner');

  await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

  // should return one row only
  expect(screen.getAllByRole('row').length).toBe(1);

  expect(screen.getByText('spare')).toBeInTheDocument();

  expect(
    screen.getByText('Extra strawberries finally cut')
  ).toBeInTheDocument();
});
