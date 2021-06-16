import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
} from '@blueprintjs/core';
import * as React from 'react';
import { useNavigate } from 'react-router';
import FormActions from '../../components/FormActions';
import { Toaster } from '../../utils/toaster';
import { Clue } from './clues-interfaces';
import { useCreateClue } from './clues-mutations';
import { paths } from './clues-paths';

type State = Omit<Clue, 'id'>;

type Action =
  | { type: 'SET_ANSWER'; payload: Clue['answer'] }
  | { type: 'SET_CLUE'; payload: Clue['clue'] }
  | { type: 'SET_NOTES'; payload: Clue['notes'] };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_ANSWER':
      return { ...state, answer: action.payload };
    case 'SET_CLUE':
      return { ...state, clue: action.payload };
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
  }
}

const initialState = {
  answer: '',
  clue: '',
  notes: '',
};

function useCreateClueForm() {
  const navigate = useNavigate();

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleAnswerChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (event) => {
      dispatch({ payload: event.target.value, type: 'SET_ANSWER' });
    },
    []
  );

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

  const isValid = state.answer !== '';

  const createMutation = useCreateClue({
    onError: () => {
      Toaster.show({
        intent: Intent.DANGER,
        message: 'An error occurred.',
      });
    },
    onSuccess: ({ id }) => {
      Toaster.show({
        intent: Intent.SUCCESS,
        message: 'Created clue.',
      });
      navigate(paths.clue(id));
    },
  });

  const handleCreateClick = () => {
    createMutation.mutate(state);
  };

  const handleCancelClick = () => {
    navigate(paths.clues);
  };

  return {
    createMutation,
    handleAnswerChange,
    handleCancelClick,
    handleCreateClick,
    handleClueChange,
    handleNotesChange,
    isValid,
    state,
  };
}

export default function CreateClueForm() {
  const {
    createMutation,
    handleAnswerChange,
    handleCancelClick,
    handleCreateClick,
    handleClueChange,
    handleNotesChange,
    isValid,
    state,
  } = useCreateClueForm();

  return (
    <form>
      <FormGroup label="Answer" labelFor="answer">
        <InputGroup
          autoFocus
          disabled={createMutation.isLoading}
          id="answer"
          onChange={handleAnswerChange}
          value={state.answer}
        />
      </FormGroup>
      <FormGroup label="Clue" labelFor="clue">
        <InputGroup
          disabled={createMutation.isLoading}
          id="clue"
          onChange={handleClueChange}
          value={state.clue}
        />
      </FormGroup>
      <FormGroup label="Notes" labelFor="notes">
        <TextArea
          disabled={createMutation.isLoading}
          fill
          id="notes"
          onChange={handleNotesChange}
          value={state.notes}
        />
      </FormGroup>
      <FormActions>
        <Button
          disabled={!isValid}
          intent={Intent.PRIMARY}
          large
          loading={createMutation.isLoading}
          onClick={handleCreateClick}
          outlined
          text="Save"
        />
        <Button
          disabled={createMutation.isLoading}
          intent={Intent.DANGER}
          large
          onClick={handleCancelClick}
          outlined
          text="Cancel"
        />
      </FormActions>
    </form>
  );
}
