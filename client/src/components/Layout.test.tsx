import * as React from 'react';
import { render, screen } from '../test/test-utils';
import Layout from './Layout';

test('it renders', async () => {
  await render(
    <Layout heading={'I am the heading'} sidebar={'I am the sidebar'}>
      I am the body
    </Layout>
  );

  expect(screen.getByText(/i am the body/i)).toBeInTheDocument();

  expect(screen.getByText(/i am the heading/i)).toBeInTheDocument();

  expect(screen.getByText(/i am the sidebar/i)).toBeInTheDocument();
});
