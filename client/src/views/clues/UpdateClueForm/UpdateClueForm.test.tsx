import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest, server } from 'src/test/server';
import { render, screen, userEvent, waitFor } from 'src/test/utils';
import { paths, UpdateClueForm } from 'src/views/clues';

const clue = {
  id: 1,
  answer: 'carroty',
  clue: 'Orange books in lift',
  notes: 'CARR<O(ld)/T(estament)>Y',
};

function Clues() {
  return <div>I'm the clues screen</div>;
}

function renderUpdateClueForm(options?: Parameters<typeof render>[1]) {
  const path = '/update-clue-form';

  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={path} element={<UpdateClueForm clue={clue} />} />
        <Route path={paths.clues} element={<Clues />} />
      </Routes>
    </MemoryRouter>,
    options
  );
}

function getElements() {
  const backLink = screen.getByRole('link', { name: /back/i });

  const clueInput = screen.getByRole('textbox', { name: /clue/i });

  const notesInput = screen.getByRole('textbox', { name: /notes/i });

  const saveButton = screen.getByRole('button', { name: /save/i });

  const deleteButton = screen.getByRole('button', { name: /delete/i });

  return {
    backLink,
    clueInput,
    notesInput,
    saveButton,
    deleteButton,
  };
}

test('it renders inputs and buttons', async () => {
  await renderUpdateClueForm();

  const {
    backLink,
    clueInput,
    notesInput,
    saveButton,
    deleteButton,
  } = getElements();

  expect(screen.getByRole('heading', { name: 'carroty' })).toBeInTheDocument();

  expect(backLink).toBeInTheDocument();

  expect(clueInput).toHaveValue('Orange books in lift');

  expect(notesInput).toHaveValue('CARR<O(ld)/T(estament)>Y');

  expect(saveButton).toBeInTheDocument();

  expect(deleteButton).toBeInTheDocument();
});

test('it handles clicking back', async () => {
  await renderUpdateClueForm();

  const { backLink } = getElements();

  userEvent.click(backLink);

  await screen.findByText("I'm the clues screen");
});

test('it handles typing into inputs and clicking save', async () => {
  await renderUpdateClueForm();

  const { clueInput, notesInput, saveButton, deleteButton } = getElements();

  expect(clueInput).toHaveValue('Orange books in lift');

  expect(notesInput).toHaveValue('CARR<O(ld)/T(estament)>Y');

  // save should be disabled if inputs are unchanged
  expect(saveButton).toBeDisabled();

  // typing should update input values
  userEvent.type(clueInput, "{selectall}{backspace}I'm a clue");

  expect(clueInput).toHaveValue("I'm a clue");

  userEvent.type(notesInput, "{selectall}{backspace}I'm some notes");

  expect(notesInput).toHaveValue("I'm some notes");

  // save should be enabled with changes
  expect(saveButton).toBeEnabled();

  // clicking save should disable inputs and buttons...
  userEvent.click(saveButton);

  await waitFor(() => expect(saveButton).toBeDisabled());

  expect(clueInput).toBeDisabled();

  expect(notesInput).toBeDisabled();

  expect(deleteButton).toBeDisabled();

  // ...until mutation has succeeded, then show toast
  await screen.findByText('Updated clue.');

  await waitFor(() => expect(saveButton).toBeEnabled());

  expect(clueInput).toBeEnabled();

  expect(notesInput).toBeEnabled();

  expect(deleteButton).toBeEnabled();
});

test('it handles save error', async () => {
  server.use(rest.put('*', async (req, res, ctx) => res(ctx.status(500))));

  await renderUpdateClueForm();

  const { clueInput, notesInput, saveButton, deleteButton } = getElements();

  userEvent.type(clueInput, "{selectall}{backspace}I'm a clue");

  expect(clueInput).toHaveValue("I'm a clue");

  // clicking save should disable inputs and buttons...
  userEvent.click(saveButton);

  await waitFor(() => expect(saveButton).toBeDisabled());

  expect(clueInput).toBeDisabled();

  expect(notesInput).toBeDisabled();

  expect(deleteButton).toBeDisabled();

  // ...until mutation has failed, then show toast
  await screen.findByText('An error occurred.');

  await waitFor(() => expect(saveButton).toBeEnabled());

  expect(clueInput).toBeEnabled();

  expect(notesInput).toBeEnabled();

  expect(deleteButton).toBeEnabled();
});

test('it handles clicking delete', async () => {
  await renderUpdateClueForm();

  const { clueInput, notesInput, saveButton, deleteButton } = getElements();

  // clicking delete should disable inputs and buttons...
  userEvent.click(deleteButton);

  await waitFor(() => expect(deleteButton).toBeDisabled());

  expect(clueInput).toBeDisabled();

  expect(notesInput).toBeDisabled();

  expect(saveButton).toBeDisabled();

  // ...until mutation has succeeded, then show toast and navigate to clues screen
  await screen.findByText('Deleted clue.');

  await screen.findByText("I'm the clues screen");
});

test('it handles delete error', async () => {
  server.use(rest.delete('*', async (req, res, ctx) => res(ctx.status(500))));

  await renderUpdateClueForm();

  const { clueInput, notesInput, saveButton, deleteButton } = getElements();

  // save should be disabled if inputs are unchanged
  expect(saveButton).toBeDisabled();

  // clicking delete should disable inputs and buttons...
  userEvent.click(deleteButton);

  await waitFor(() => expect(deleteButton).toBeDisabled());

  expect(clueInput).toBeDisabled();

  expect(notesInput).toBeDisabled();

  // ...until mutation has failed, then show toast
  await screen.findByText('An error occurred.');

  await waitFor(() => expect(deleteButton).toBeEnabled());

  expect(clueInput).toBeEnabled();

  expect(notesInput).toBeEnabled();
});
