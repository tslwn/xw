import * as React from 'react';
import { useParams } from 'react-router';
import QueryState from '../components/QueryState';
import UpdateClueForm from './UpdateClueForm';
import { useClue } from './clues-queries';

export default function ClueScreen() {
  const { id } = useParams();

  const query = useClue(Number(id));

  switch (query.status) {
    case 'idle':
      return (
        <QueryState
          onActionClick={() => {
            query.refetch();
          }}
          status="idle"
          title="No clue loaded."
        />
      );
    case 'loading':
      return <QueryState status="loading" title="Loading clue..." />;
    case 'error':
      return (
        <QueryState
          onActionClick={() => {
            query.refetch();
          }}
          status="error"
          title="An error occurred."
        />
      );
    case 'success':
      return <UpdateClueForm clue={query.data} />;
  }
}
