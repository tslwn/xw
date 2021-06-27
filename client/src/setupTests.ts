import '@testing-library/jest-dom';
import { act, configure } from '@testing-library/react';
import { setLogger } from 'react-query';
import { server } from 'src/test/server';

configure({ defaultHidden: true });

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

afterEach(async () => {
  if (jest.isMockFunction(setTimeout)) {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  }
});

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
