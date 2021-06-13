import {
  Button,
  Card,
  EditableText,
  H5,
  Intent,
  Text,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import * as React from 'react';
import MutationStatusIndicator from '../components/MutationStatusIndicator';
import './ClueCard.scss';
import { Clue } from './clues-interfaces';
import { useDeleteClue, useUpdateClue } from './clues-mutations';

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

  const handleAnswerConfirm = (value: string) => {
    if (value !== rest.answer) {
      updateAnswerMutation.mutate({ ...state, answer: value });
    }
  };

  const updateClueMutation = useUpdateClue(id);

  const handleClueChange = React.useCallback((value: string) => {
    dispatch({ payload: value, type: 'SET_CLUE' });
  }, []);

  const handleClueConfirm = (value: string) => {
    if (value !== rest.clue) {
      updateClueMutation.mutate({ ...state, clue: value });
    }
  };

  const updateNotesMutation = useUpdateClue(id);

  const handleNotesChange = React.useCallback((value: string) => {
    dispatch({ payload: value, type: 'SET_NOTES' });
  }, []);

  const handleNotesConfirm = (value: string) => {
    if (value !== rest.notes) {
      updateNotesMutation.mutate({ ...state, notes: value });
    }
  };

  const deleteMutation = useDeleteClue(id);

  const handleDeleteClick = () => {
    deleteMutation.mutate();
  };

  return {
    deleteMutation,
    handleAnswerChange,
    handleAnswerConfirm,
    handleClueChange,
    handleClueConfirm,
    handleDeleteClick,
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
    deleteMutation,
    handleAnswerChange,
    handleAnswerConfirm,
    handleClueChange,
    handleClueConfirm,
    handleDeleteClick,
    handleNotesChange,
    handleNotesConfirm,
    state,
    updateAnswerMutation,
    updateClueMutation,
    updateNotesMutation,
  } = useClueCard(clue);

  return (
    <Card className="clue-card">
      <div className="clue-card__row">
        <H5 className="clue-card__answer clue-card__text">
          <EditableText
            disabled={
              deleteMutation.isLoading || updateAnswerMutation.isLoading
            }
            onChange={handleAnswerChange}
            onConfirm={handleAnswerConfirm}
            value={state.answer}
          />
          <MutationStatusIndicator mutation={updateAnswerMutation} />
        </H5>
        <Button
          className="clue-card__delete"
          icon={IconNames.Delete}
          intent={Intent.DANGER}
          loading={deleteMutation.isLoading}
          minimal
          onClick={handleDeleteClick}
          small
          title="Delete clue"
        />
      </div>
      <Text className="clue-card__row clue-card__text">
        <EditableText
          disabled={deleteMutation.isLoading || updateClueMutation.isLoading}
          onChange={handleClueChange}
          onConfirm={handleClueConfirm}
          placeholder="Enter clue"
          value={state.clue}
        />
        <MutationStatusIndicator mutation={updateClueMutation} />
      </Text>
      <Text className="clue-card__row clue-card__multiline">
        <EditableText
          disabled={deleteMutation.isLoading || updateNotesMutation.isLoading}
          multiline
          onChange={handleNotesChange}
          onConfirm={handleNotesConfirm}
          placeholder="Enter notes"
          value={state.notes}
        />
        <MutationStatusIndicator mutation={updateNotesMutation} />
      </Text>
    </Card>
  );
}
