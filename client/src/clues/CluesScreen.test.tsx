import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
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

  const button = screen.getByRole('button', { name: /retry/i });

  // clicking retry should trigger refetch
  userEvent.click(button);

  await screen.findByTestId('spinner');
});

test('it renders loading state', async () => {
  await renderCluesScreen();

  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});

test('it renders error state', async () => {
  server.use(rest.get('*', async (req, res, ctx) => res(ctx.status(500))));

  await renderCluesScreen();

  await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

  expect(screen.getByText(/an error occurred./i)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /retry/i });

  server.resetHandlers();

  // clicking retry should trigger refetch
  userEvent.click(button);

  await screen.findByTestId('spinner');
});

test('it renders success state', async () => {
  await renderCluesScreen();

  await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

  expect(screen.getByRole('heading', { name: /clues/i })).toBeInTheDocument();

  const link = screen.getByRole('link', { name: /create/i });

  expect(screen.getByText('carroty')).toBeInTheDocument();

  expect(screen.getByText('Orange books in lift')).toBeInTheDocument();

  // clicking link should navigate to "/new"
  userEvent.click(link);

  await screen.findByRole('heading', { name: /somewhere else/i });
});
