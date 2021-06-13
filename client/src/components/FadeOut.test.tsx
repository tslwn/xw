import * as React from 'react';
import { render, screen, waitForElementToBeRemoved } from '../test/test-utils';
import FadeOut from './FadeOut';

test('it renders', async () => {
  await render(<FadeOut>I disappear</FadeOut>);

  expect(screen.getByText(/i disappear/i)).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getByText(/i disappear/i));
});
