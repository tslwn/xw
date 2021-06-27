import * as React from 'react';
import { render, screen, userEvent } from 'src/test/utils';
import QueryState from './QueryState';

test('it renders idle state', async () => {
  const handleActionClick = jest.fn();

  await render(
    <QueryState
      onActionClick={handleActionClick}
      status="idle"
      title="I am idle"
    />
  );

  const button = screen.getByRole('button', { name: /retry/i });

  expect(screen.getByTitle(/offline/i)).toBeInTheDocument();

  expect(screen.getByText(/i am idle/i)).toBeInTheDocument();

  userEvent.click(button);

  expect(handleActionClick).toHaveBeenCalledTimes(1);
});

test('it renders loading state', async () => {
  const handleActionClick = jest.fn();

  await render(
    <QueryState
      onActionClick={handleActionClick}
      status="loading"
      title="I am loading"
    />
  );

  const button = screen.getByRole('button', { name: /cancel/i });

  expect(screen.getByTestId('spinner')).toBeInTheDocument();

  expect(screen.getByText(/i am loading/i)).toBeInTheDocument();

  userEvent.click(button);

  expect(handleActionClick).toHaveBeenCalledTimes(1);
});

test('it renders error state', async () => {
  const handleActionClick = jest.fn();

  await render(
    <QueryState
      onActionClick={handleActionClick}
      status="error"
      title="I am an error"
    />
  );

  const button = screen.getByRole('button', { name: /retry/i });

  expect(screen.getByTitle(/error/i)).toBeInTheDocument();

  expect(screen.getByText(/i am an error/i)).toBeInTheDocument();

  userEvent.click(button);

  expect(handleActionClick).toHaveBeenCalledTimes(1);
});
