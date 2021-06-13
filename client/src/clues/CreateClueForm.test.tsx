import * as React from 'react';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { render, screen, userEvent } from '../test/test-utils';
import CreateClueForm from './CreateClueForm';

function Clue() {
  return <div>I'm the clue screen</div>;
}

function Clues() {
  return <div>I'm the clues screen</div>;
}

function renderCreateClueForm(options?: Parameters<typeof render>[1]) {
  return render(
    <MemoryRouter initialEntries={['/clues/new']}>
      <Routes>
        <Route path="/clues/new" element={<CreateClueForm />} />
        <Route path="/clues/:id" element={<Clue />} />
        <Route path="/clues" element={<Clues />} />
      </Routes>
    </MemoryRouter>,
    options
  );
}

test('it handles typing into inputs and clicking save', async () => {
  await renderCreateClueForm();

  const answerInput = screen.getByRole('textbox', { name: /answer/i });

  // answer should have focus initially
  expect(answerInput).toHaveFocus();

  // save should be disabled if answer is empty
  const saveButton = screen.getByRole('button', { name: /save/i });

  expect(saveButton).toBeDisabled();

  userEvent.type(answerInput, "I'm an answer");

  expect(answerInput).toHaveValue("I'm an answer");

  // save should be enabled if answer is not empty
  expect(saveButton).toBeEnabled();

  // typing should update other input values
  const clueInput = screen.getByRole('textbox', { name: /clue/i });

  userEvent.type(clueInput, "I'm a clue");

  expect(clueInput).toHaveValue("I'm a clue");

  const notesInput = screen.getByRole('textbox', { name: /notes/i });

  userEvent.type(notesInput, "I'm some notes");

  expect(notesInput).toHaveValue("I'm some notes");

  // clicking save should navigate to clue screen
  userEvent.click(saveButton);

  await screen.findByText("I'm the clue screen");
});

test('it handles clicking cancel', async () => {
  await renderCreateClueForm();

  const cancelButton = screen.getByRole('button', { name: /cancel/i });

  // clicking cancel should navigate to clues screen
  userEvent.click(cancelButton);

  await screen.findByText("I'm the clues screen");
});
