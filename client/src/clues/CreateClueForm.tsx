import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import * as React from 'react';
import './CreateClueForm.scss';
import { useCreateClue } from './clues-mutations';

function useCreateClueForm() {
  const createMutation = useCreateClue();

  const [answer, setAnswer] = React.useState('');

  const handleAnswerChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (event) => {
      setAnswer(event.target.value);
    },
    []
  );

  const handleCreateClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event?.preventDefault();
    createMutation.mutate({
      answer,
    });
    setAnswer('');
  };

  return {
    answer,
    createMutation,
    handleAnswerChange,
    handleCreateClick,
  };
}

export default function CreateClueForm() {
  const {
    answer,
    createMutation,
    handleAnswerChange,
    handleCreateClick,
  } = useCreateClueForm();

  return (
    <form className="create-clue-form">
      <InputGroup
        aria-label="Answer"
        disabled={createMutation.isLoading}
        fill
        intent={Intent.PRIMARY}
        large
        onChange={handleAnswerChange}
        placeholder="Enter answer"
        value={answer}
      />
      <Button
        className="create-clue-form__button"
        intent={Intent.PRIMARY}
        large
        loading={createMutation.isLoading}
        minimal
        onClick={handleCreateClick}
        text="Create"
        type="submit"
      />
    </form>
  );
}
