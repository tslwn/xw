import { NonIdealState, Button, Spinner } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import * as React from 'react';
import './QueryState.scss';

interface QueryStateProps {
  onActionClick: () => void;
  status: 'idle' | 'loading' | 'error';
  title?: string;
}

export default function QueryState({
  onActionClick,
  status,
  title,
}: QueryStateProps) {
  switch (status) {
    case 'idle':
      return (
        <div className="query-state">
          <NonIdealState
            action={
              <Button large minimal onClick={onActionClick}>
                Retry
              </Button>
            }
            icon={IconNames.Offline}
            title={title}
          />
        </div>
      );
    case 'loading':
      return (
        <div className="query-state">
          <NonIdealState
            action={
              <Button large minimal onClick={onActionClick}>
                Cancel
              </Button>
            }
            icon={
              <div data-testid="spinner">
                <Spinner size={60} />
              </div>
            }
            title={title}
          />
        </div>
      );
    case 'error':
      return (
        <div className="query-state">
          <NonIdealState
            action={
              <Button large minimal onClick={onActionClick}>
                Retry
              </Button>
            }
            icon={IconNames.Error}
            title={title}
          />
        </div>
      );
  }
}
