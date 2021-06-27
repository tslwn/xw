import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CluePage, CluesPage, CreateClueForm, paths } from 'src/views/clues';

function CluesRoutes() {
  return (
    <Routes>
      <Route path={paths.create} element={<CreateClueForm />} />
      <Route path={paths.clue()} element={<CluePage />} />
      <Route path={paths.clues} element={<CluesPage />} />
      <Route path="/" element={<CluesPage />} />
    </Routes>
  );
}

export default CluesRoutes;
