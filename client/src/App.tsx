import '@blueprintjs/core/lib/css/blueprint.css';
import 'normalize.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CluesScreen from './clues/CluesScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CluesScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
