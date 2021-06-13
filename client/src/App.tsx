import { H2 } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import 'normalize.css';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClueScreen from './clues/ClueScreen';
import CluesScreen from './clues/CluesScreen';
import HomeLink from './components/HomeLink';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout heading={<HomeLink />}>
        <Routes>
          <Route path="/clues/:id" element={<ClueScreen />} />
          <Route path="/clues" element={<CluesScreen />} />
          <Route path="/" element={<CluesScreen />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
