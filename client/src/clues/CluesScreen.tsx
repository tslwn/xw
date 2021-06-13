import * as React from 'react';
import { useQueryClient } from 'react-query';
import QueryState from '../components/QueryState';
import './CluesScreen.scss';
import CluesTable from './CluesTable';
import { queryKeys } from './clues-constants';
import { useClues } from './clues-queries';

export default function CluesScreen() {
  const query = useClues();

  const queryClient = useQueryClient();

  switch (query.status) {
    case 'idle':
      return (
        <QueryState
          onActionClick={() => {
            query.refetch();
          }}
          status="idle"
        />
      );
    case 'loading':
      return (
        <QueryState
          onActionClick={() => {
            queryClient.cancelQueries(queryKeys.clues);
          }}
          status="loading"
        />
      );
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
      return <CluesTable clues={query.data} />;
  }
}
