import '@blueprintjs/core/lib/css/blueprint.css';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HomeLink, Layout } from 'src/components';
import { CluesRoutes } from 'src/views/clues';

function App() {
  return (
    <BrowserRouter>
      <Layout heading={<HomeLink />}>
        <CluesRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
