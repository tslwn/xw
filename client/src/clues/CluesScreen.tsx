import { Classes, H2 } from '@blueprintjs/core';
import * as React from 'react';
import { useQueryClient } from 'react-query';
import Heading from '../components/Heading';
import LargeButtonLink from '../components/LargeButtonLink';
import QueryState from '../components/QueryState';
import CluesTable from './CluesTable';
import { queryKeys, routes } from './clues-constants';
import { useClues } from './clues-queries';

function useCluesScreen() {
  const query = useClues();

  const queryClient = useQueryClient();

  const handleRefetch = () => {
    query.refetch();
  };

  const handleCancel = () => {
    queryClient.cancelQueries(queryKeys.clues);
  };

  return {
    handleCancel,
    handleRefetch,
    query,
  };
}

export default function CluesScreen() {
  const { handleCancel, handleRefetch, query } = useCluesScreen();

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
      return (
        <>
          <Heading
            right={
              <LargeButtonLink
                className={Classes.INTENT_PRIMARY}
                to={routes.new}
              >
                Create
              </LargeButtonLink>
            }
          >
            <H2>Clues</H2>
          </Heading>
          <CluesTable clues={query.data} />
        </>
      );
  }
}
