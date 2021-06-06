import * as React from 'react';
import { useQueryClient } from 'react-query';
import Layout from '../components/Layout';
import QueryState from '../components/QueryState';
import ClueCard from './ClueCard';
import './CluesScreen.scss';
import { queryKeys } from './clues-constants';
import { useClues } from './clues-queries';

export default function CluesScreen() {
  const query = useClues();

  const queryClient = useQueryClient();

  switch (query.status) {
    case 'idle':
      return (
        <Layout className="clues-screen">
          <QueryState
            onActionClick={() => {
              query.refetch();
            }}
            status="idle"
            title="No clues loaded."
          />
        </Layout>
      );
    case 'loading':
      return (
        <Layout className="clues-screen">
          <QueryState
            onActionClick={() => {
              queryClient.cancelQueries(queryKeys.clues);
            }}
            status="loading"
            title="Loading clues..."
          />
        </Layout>
      );
    case 'error':
      return (
        <Layout className="clues-screen">
          <QueryState
            onActionClick={() => {
              query.refetch();
            }}
            status="error"
            title="An error occurred."
          />
        </Layout>
      );
    case 'success':
      return (
        <Layout className="clues-screen">
          <h1>Clues</h1>
          {query.data.map((clue) => (
            <ClueCard clue={clue} key={clue.id} />
          ))}
        </Layout>
      );
  }
}
