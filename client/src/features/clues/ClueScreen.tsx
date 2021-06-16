import * as React from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import QueryState from '../../components/QueryState';
import UpdateClueForm from './UpdateClueForm';
import { useClue } from './clues-queries';
import { queryKeys } from './clues-query-keys';

function useClueScreen() {
  const { id: encodedId } = useParams();

  const id = Number(decodeURIComponent(encodedId));

  const query = useClue(id);

  const queryClient = useQueryClient();

  const handleRefetch = () => {
    query.refetch();
  };

  const handleCancel = () => {
    queryClient.cancelQueries(queryKeys.clue(id));
  };

  return {
    handleCancel,
    handleRefetch,
    query,
  };
}

export default function ClueScreen() {
  const { handleCancel, handleRefetch, query } = useClueScreen();

  switch (query.status) {
    case 'idle':
      return <QueryState onActionClick={handleRefetch} status="idle" />;
    case 'loading':
      return <QueryState onActionClick={handleCancel} status="loading" />;
    case 'error':
      return (
        <QueryState
          onActionClick={handleRefetch}
          status="error"
          title="An error occurred."
        />
      );
    case 'success':
      return <UpdateClueForm clue={query.data} />;
  }
}
