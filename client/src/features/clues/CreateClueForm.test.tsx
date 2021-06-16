import { rest } from 'msw';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { server } from '../../test/setup-server';
import { render, screen, userEvent, waitFor } from '../../test/test-utils';
import CreateClueForm from './CreateClueForm';
import { paths } from './clues-paths';

function Clue() {
  return <div>I'm the clue screen</div>;
}

function Clues() {
  return <div>I'm the clues screen</div>;
}

function renderCreateClueForm(options?: Parameters<typeof render>[1]) {
  return render(
    <MemoryRouter initialEntries={[paths.create]}>
      <Routes>
        <Route path={paths.create} element={<CreateClueForm />} />
        <Route path={paths.clue()} element={<Clue />} />
        <Route path={paths.clues} element={<Clues />} />
      </Routes>
    </MemoryRouter>,
    options
  );
}

function getElements() {
  const answerInput = screen.getByRole('textbox', { name: /answer/i });

  const clueInput = screen.getByRole('textbox', { name: /clue/i });

  const notesInput = screen.getByRole('textbox', { name: /notes/i });

  const saveButton = screen.getByRole('button', { name: /save/i });

  const cancelButton = screen.getByRole('button', { name: /cancel/i });

  return {
    answerInput,
    clueInput,
    notesInput,
    saveButton,
    cancelButton,
  };
}

test('it renders inputs and buttons', async () => {
  await renderCreateClueForm();

  const {
    answerInput,
    clueInput,
    notesInput,
    saveButton,
    cancelButton,
  } = getElements();

  expect(answerInput).toBeInTheDocument();

  expect(answerInput).toHaveValue('');

  expect(clueInput).toBeInTheDocument();

  expect(clueInput).toHaveValue('');

  expect(notesInput).toBeInTheDocument();

  expect(notesInput).toHaveValue('');

  expect(saveButton).toBeInTheDocument();

  expect(cancelButton).toBeInTheDocument();
});

test('it handles clicking cancel', async () => {
  await renderCreateClueForm();

  const { cancelButton } = getElements();

  userEvent.click(cancelButton);

  await screen.findByText("I'm the clues screen");
});

test('it handles typing into inputs and clicking save', async () => {
  await renderCreateClueForm();

  const { answerInput, clueInput, notesInput, saveButton } = getElements();

  // answer should have focus initially
  expect(answerInput).toHaveFocus();

  // save should be disabled if answer is empty
  expect(saveButton).toBeDisabled();

  userEvent.type(answerInput, "I'm an answer");

  expect(answerInput).toHaveValue("I'm an answer");

  // save should be enabled if answer is not empty
  expect(saveButton).toBeEnabled();

  // typing should update other input values
  userEvent.type(clueInput, "I'm a clue");

  expect(clueInput).toHaveValue("I'm a clue");

  expect(notesInput).toBeInTheDocument();

  userEvent.type(notesInput, "I'm some notes");

  expect(notesInput).toHaveValue("I'm some notes");

  // clicking save should disable inputs and buttons...
  userEvent.click(saveButton);

  await waitFor(() => expect(saveButton).toBeDisabled());

  expect(answerInput).toBeDisabled();

  expect(clueInput).toBeDisabled();

  expect(notesInput).toBeDisabled();

  // ...until mutation has succeeded, then show toast and navigate to clue screen
  await screen.findByText('Created clue.');

  await screen.findByText("I'm the clue screen");
});

test('it handles save error', async () => {
  server.use(rest.post('*', async (req, res, ctx) => res(ctx.status(500))));

  await renderCreateClueForm();

  const {
    answerInput,
    clueInput,
    notesInput,
    saveButton,
    cancelButton,
  } = getElements();

  userEvent.type(answerInput, "I'm an answer");

  // clicking save should disable inputs and buttons...
  userEvent.click(saveButton);

  await waitFor(() => expect(saveButton).toBeDisabled());

  expect(answerInput).toBeDisabled();

  expect(clueInput).toBeDisabled();

  expect(notesInput).toBeDisabled();

  expect(cancelButton).toBeDisabled();

  // ...until mutation has failed, then show toast
  await screen.findByText('An error occurred.');

  await waitFor(() => expect(saveButton).toBeEnabled());

  expect(answerInput).toBeEnabled();

  expect(clueInput).toBeEnabled();

  expect(notesInput).toBeEnabled();

  expect(cancelButton).toBeEnabled();
});
