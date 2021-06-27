import { Classes, InputGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import * as React from 'react';
import { useQueryClient, UseQueryResult } from 'react-query';
import { Heading, LargeButtonLink, QueryState } from 'src/components';
import { Clue } from 'src/types';
import { CluesTable, paths, queryKeys, useSearchClues } from 'src/views/clues';
import { useDebounce } from 'use-debounce';

interface CluesScreenBodyProps {
  onCancel: () => void;
  onRefetch: () => void;
  query: UseQueryResult<Clue[]>;
}

function CluesScreenBody({ onCancel, onRefetch, query }: CluesScreenBodyProps) {
  switch (query.status) {
    case 'idle':
      return <QueryState onActionClick={onRefetch} status="idle" />;
    case 'loading':
      return <QueryState onActionClick={onCancel} status="loading" />;
    case 'error':
      return (
        <QueryState
          onActionClick={onRefetch}
          status="error"
          title="An error occurred."
        />
      );
    case 'success':
      return <CluesTable clues={query.data} />;
  }
}

const DEFAULT_MIN_SEARCH_LENGTH = 3;

const DEFAULT_SEARCH_DELAY = 50;

function useCluesScreen(
  minSearchLength = DEFAULT_MIN_SEARCH_LENGTH,
  searchDelay = DEFAULT_SEARCH_DELAY
) {
  const [search, setSearch] = React.useState('');

  const [debouncedSearch] = useDebounce(search, searchDelay);

  const query = useSearchClues(
    debouncedSearch.length >= minSearchLength ? debouncedSearch : undefined
  );

  const queryClient = useQueryClient();

  const handleRefetch = () => {
    query.refetch();
  };

  const handleCancel = () => {
    queryClient.cancelQueries(queryKeys.clues);
  };

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (event) => {
      setSearch(event.target.value);
    },
    []
  );

  return {
    handleCancel,
    handleRefetch,
    handleSearchChange,
    query,
    search,
  };
}

export default function CluesScreen() {
  const {
    handleCancel,
    handleRefetch,
    handleSearchChange,
    search,
    query,
  } = useCluesScreen();

  return (
    <>
      <Heading
        right={
          <LargeButtonLink className={Classes.INTENT_PRIMARY} to={paths.create}>
            Create
          </LargeButtonLink>
        }
      >
        <InputGroup
          aria-label="Search clues"
          fill
          leftIcon={IconNames.Search}
          large
          onChange={handleSearchChange}
          placeholder="Search clues"
          value={search}
        />
      </Heading>
      <CluesScreenBody
        onCancel={handleCancel}
        onRefetch={handleRefetch}
        query={query}
      />
    </>
  );
}
