import {
  render as rtlRender,
  RenderOptions as RTLRenderOptions,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { DefaultOptions, QueryClient } from 'react-query';
import AppProviders from '../AppProviders';

const createWrapper = (defaultOptions?: DefaultOptions) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      ...defaultOptions,
    },
  });

  return ({ children }: { children?: React.ReactNode }) => (
    <AppProviders queryClient={queryClient}>{children}</AppProviders>
  );
};

interface RenderOptions extends RTLRenderOptions {
  defaultOptions?: DefaultOptions;
}

async function render(
  ui: React.ReactElement,
  { defaultOptions, ...renderOptions }: RenderOptions = {
    defaultOptions: undefined,
  }
) {
  const returnValue = {
    ...rtlRender(ui, {
      wrapper: createWrapper(defaultOptions),
      ...renderOptions,
    }),
  };

  return returnValue;
}

export * from '@testing-library/react';
export { createWrapper, render, userEvent };
