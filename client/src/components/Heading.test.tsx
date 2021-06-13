import * as React from 'react';
import { render, screen } from '../test/test-utils';
import Heading from './Heading';

test('it renders', async () => {
  await render(<Heading right={'I am right'}>I am left</Heading>);

  expect(screen.getByText(/i am left/i)).toBeInTheDocument();

  expect(screen.getByText(/i am right/i)).toBeInTheDocument();
});
