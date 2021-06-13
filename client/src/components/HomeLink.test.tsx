import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, userEvent } from '../test/test-utils';
import HomeLink from './HomeLink';

function SomewhereElse() {
  return (
    <>
      <h1>Somewhere else</h1>
      <HomeLink />
    </>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function renderHomeLink(options?: Parameters<typeof render>[1]) {
  const path = '/somewhere-else';

  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={path} element={<SomewhereElse />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </MemoryRouter>,
    options
  );
}

test('it renders', async () => {
  await renderHomeLink();

  expect(
    screen.getByRole('heading', { name: /somewhere else/i })
  ).toBeInTheDocument();

  const link = screen.getByRole('link', { name: /xw/i });

  userEvent.click(link);

  await screen.findByRole('heading', { name: /home/i });
});
