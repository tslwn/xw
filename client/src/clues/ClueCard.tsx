import { Card, EditableText, H5, Text } from '@blueprintjs/core';
import * as React from 'react';
import MutationStatusIndicator from '../components/MutationStatusIndicator';
import './ClueCard.scss';
import { Clue } from './clues-interfaces';
import { useUpdateClue } from './clues-mutations';

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

function useClueCard(clue: Clue) {
  const { id, ...rest } = clue;

  const [state, dispatch] = React.useReducer(reducer, rest);

  const updateAnswerMutation = useUpdateClue(id);

  const handleAnswerChange = React.useCallback((value: string) => {
    dispatch({ payload: value, type: 'SET_ANSWER' });
  }, []);

  const handleAnswerConfirm = React.useCallback(
    (value: string) => {
      if (value !== rest.answer) {
        updateAnswerMutation.mutate({ ...state, answer: value });
      }
    },
    [rest.answer, state, updateAnswerMutation]
  );

  const updateClueMutation = useUpdateClue(id);

  const handleClueChange = React.useCallback((value: string) => {
    dispatch({ payload: value, type: 'SET_CLUE' });
  }, []);

  const handleClueConfirm = React.useCallback(
    (value: string) => {
      if (value !== rest.clue) {
        updateClueMutation.mutate({ ...state, clue: value });
      }
    },
    [rest.clue, state, updateClueMutation]
  );

  const updateNotesMutation = useUpdateClue(id);

  const handleNotesChange = React.useCallback((value: string) => {
    dispatch({ payload: value, type: 'SET_NOTES' });
  }, []);

  const handleNotesConfirm = React.useCallback(
    (value: string) => {
      if (value !== rest.notes) {
        updateNotesMutation.mutate({ ...state, notes: value });
      }
    },
    [rest.notes, state, updateNotesMutation]
  );

  return {
    handleAnswerChange,
    handleAnswerConfirm,
    handleClueChange,
    handleClueConfirm,
    handleNotesChange,
    handleNotesConfirm,
    state,
    updateAnswerMutation,
    updateClueMutation,
    updateNotesMutation,
  };
}

interface ClueProps {
  clue: Clue;
}

export default function ClueCard({ clue }: ClueProps) {
  const {
    handleAnswerChange,
    handleAnswerConfirm,
    handleClueChange,
    handleClueConfirm,
    handleNotesChange,
    handleNotesConfirm,
    state,
    updateAnswerMutation,
    updateClueMutation,
    updateNotesMutation,
  } = useClueCard(clue);

  return (
    <Card className="clue-card">
      <H5 className="clue-card__text">
        <EditableText
          disabled={updateAnswerMutation.isLoading}
          onChange={handleAnswerChange}
          onConfirm={handleAnswerConfirm}
          value={state.answer}
        />
        <MutationStatusIndicator mutation={updateAnswerMutation} />
      </H5>
      <Text className="clue-card__text">
        <EditableText
          disabled={updateClueMutation.isLoading}
          onChange={handleClueChange}
          onConfirm={handleClueConfirm}
          placeholder="Edit clue"
          value={state.clue}
        />
        <MutationStatusIndicator mutation={updateClueMutation} />
      </Text>
      <Text className="clue-card__multiline">
        <EditableText
          disabled={updateNotesMutation.isLoading}
          multiline
          onChange={handleNotesChange}
          onConfirm={handleNotesConfirm}
          placeholder="Edit notes"
          value={state.notes}
        />
        <MutationStatusIndicator mutation={updateNotesMutation} />
      </Text>
    </Card>
  );
}
