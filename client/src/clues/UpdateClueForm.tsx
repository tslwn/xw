import {
  Button,
  FormGroup,
  H2,
  InputGroup,
  Intent,
  TextArea,
} from '@blueprintjs/core';
import * as React from 'react';
import { useNavigate } from 'react-router';
import Heading from '../components/Heading';
import LargeButtonLink from '../components/LargeButtonLink';
import './UpdateClueForm.scss';
import { routes } from './clues-constants';
import { Clue } from './clues-interfaces';
import { useDeleteClue, useUpdateClue } from './clues-mutations';

type State = Omit<Clue, 'id' | 'answer'>;

type Action =
  | { type: 'SET_CLUE'; payload: Clue['clue'] }
  | { type: 'SET_NOTES'; payload: Clue['notes'] };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_CLUE':
      return { ...state, clue: action.payload };
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
  }
}

function useUpdateClueForm({ answer, clue, id, notes }: Clue) {
  const navigate = useNavigate();

  const [state, dispatch] = React.useReducer(reducer, { clue, notes });

  const handleClueChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (event) => {
      dispatch({ payload: event.target.value, type: 'SET_CLUE' });
    },
    []
  );

  const handleNotesChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback(
    (event) => {
      dispatch({ payload: event.target.value, type: 'SET_NOTES' });
    },
    []
  );

  const isDirty = state.clue !== clue || state.notes !== notes;

  const updateMutation = useUpdateClue(id);

  const handleSaveClick = () => {
    updateMutation.mutate({ answer, ...state });
  };

  const deleteMutation = useDeleteClue(id, {
    onSuccess: () => {
      navigate(routes.clues);
    },
  });

  const handleDeleteClick = () => {
    deleteMutation.mutate();
  };

  return {
    deleteMutation,
    handleClueChange,
    handleDeleteClick,
    handleNotesChange,
    handleSaveClick,
    isDirty,
    state,
    updateMutation,
  };
}

interface ClueProps {
  clue: Clue;
}

export default function UpdateClueForm({ clue }: ClueProps) {
  const {
    deleteMutation,
    handleClueChange,
    handleDeleteClick,
    handleNotesChange,
    handleSaveClick,
    isDirty,
    state,
    updateMutation,
  } = useUpdateClueForm(clue);

  return (
    <form>
      <Heading
        right={<LargeButtonLink to={routes.clues}>Back</LargeButtonLink>}
      >
        <H2>{clue.answer}</H2>
      </Heading>
      <FormGroup label="Clue" labelFor="clue">
        <InputGroup
          disabled={deleteMutation.isLoading || updateMutation.isLoading}
          id="clue"
          onChange={handleClueChange}
          value={state.clue}
        />
      </FormGroup>
      <FormGroup label="Notes" labelFor="notes">
        <TextArea
          disabled={deleteMutation.isLoading || updateMutation.isLoading}
          fill
          id="notes"
          onChange={handleNotesChange}
          value={state.notes}
        />
      </FormGroup>
      <div className="update-clue-form__actions">
        <Button
          disabled={deleteMutation.isLoading || !isDirty}
          intent={Intent.PRIMARY}
          large
          loading={updateMutation.isLoading}
          minimal
          onClick={handleSaveClick}
          text="Save"
        />
        <Button
          disabled={updateMutation.isLoading}
          intent={Intent.DANGER}
          large
          loading={deleteMutation.isLoading}
          minimal
          onClick={handleDeleteClick}
          text="Delete"
        />
      </div>
    </form>
  );
}
