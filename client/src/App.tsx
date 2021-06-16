import '@blueprintjs/core/lib/css/blueprint.css';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeLink from './components/HomeLink';
import Layout from './components/Layout';
import ClueScreen from './features/clues/ClueScreen';
import CluesScreen from './features/clues/CluesScreen';
import CreateClueForm from './features/clues/CreateClueForm';
import { paths } from './features/clues/clues-paths';

function App() {
  return (
    <BrowserRouter>
      <Layout heading={<HomeLink />}>
        <Routes>
          <Route path={paths.create} element={<CreateClueForm />} />
          <Route path={paths.clue()} element={<ClueScreen />} />
          <Route path={paths.clues} element={<CluesScreen />} />
          <Route path="/" element={<CluesScreen />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
