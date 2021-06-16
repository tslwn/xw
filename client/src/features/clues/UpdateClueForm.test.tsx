import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, userEvent, waitFor } from '../../test/test-utils';
import UpdateClueForm from './UpdateClueForm';
import { paths } from './clues-paths';

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

test('it renders inputs and buttons', async () => {
  await renderUpdateClueForm();

  expect(screen.getByRole('heading', { name: 'carroty' })).toBeInTheDocument();

  expect(screen.getByRole('link', { name: /back/i })).toBeInTheDocument();

  const clueInput = screen.getByRole('textbox', { name: /clue/i });

  expect(clueInput).toHaveValue('Orange books in lift');

  const notesInput = screen.getByRole('textbox', { name: /notes/i });

  expect(notesInput).toHaveValue('CARR<O(ld)/T(estament)>Y');

  expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
});

test('it handles clicking back', async () => {
  await renderUpdateClueForm();

  const backLink = screen.getByRole('link', { name: /back/i });

  userEvent.click(backLink);

  await screen.findByText("I'm the clues screen");
});

test('it handles typing into inputs and clicking save', async () => {
  await renderUpdateClueForm();

  const clueInput = screen.getByRole('textbox', { name: /clue/i });

  expect(clueInput).toHaveValue('Orange books in lift');

  const notesInput = screen.getByRole('textbox', { name: /notes/i });

  expect(notesInput).toHaveValue('CARR<O(ld)/T(estament)>Y');

  // save should be disabled without changes
  const saveButton = screen.getByRole('button', { name: /save/i });

  expect(saveButton).toBeDisabled();

  // changes should update textboxes
  userEvent.type(clueInput, "{selectall}{backspace}I'm a clue");

  expect(clueInput).toHaveValue("I'm a clue");

  userEvent.type(notesInput, "{selectall}{backspace}I'm some notes");

  expect(notesInput).toHaveValue("I'm some notes");

  // save should be enabled with changes
  expect(saveButton).toBeEnabled();

  // clicking save should show loading state...
  userEvent.click(saveButton);

  await waitFor(() => expect(saveButton).toBeDisabled());

  expect(clueInput).toBeDisabled();

  expect(notesInput).toBeDisabled();

  // ...until mutation has succeeded
  await waitFor(() => expect(saveButton).toBeEnabled());

  expect(clueInput).toBeEnabled();

  expect(notesInput).toBeEnabled();
});

test('it handles clicking delete', async () => {
  await renderUpdateClueForm();

  const clueInput = screen.getByRole('textbox', { name: /clue/i });

  const notesInput = screen.getByRole('textbox', { name: /notes/i });

  const saveButton = screen.getByRole('button', { name: /save/i });

  const deleteButton = screen.getByRole('button', { name: /delete/i });

  // clicking delete should show loading state...
  userEvent.click(deleteButton);

  await waitFor(() => expect(deleteButton).toBeDisabled());

  expect(clueInput).toBeDisabled();

  expect(notesInput).toBeDisabled();

  expect(saveButton).toBeDisabled();

  // ...and navigate to clues screen
  await screen.findByText("I'm the clues screen");
});
