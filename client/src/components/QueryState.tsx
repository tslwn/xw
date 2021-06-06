import { NonIdealState, Button, Spinner } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import * as React from 'react';
import './QueryState.scss';

interface QueryState {
  onActionClick?: () => void;
  status: 'idle' | 'loading' | 'error';
  title: string;
}

export default function Layout({ onActionClick, status, title }: QueryState) {
  switch (status) {
    case 'idle':
      return (
        <div className="query-state">
          <NonIdealState
            action={<Button onClick={onActionClick}>Retry</Button>}
            icon={IconNames.Offline}
            title={title}
          />
        </div>
      );
    case 'loading':
      return (
        <div className="query-state">
          <NonIdealState
            action={<Button onClick={onActionClick}>Cancel</Button>}
            icon={<Spinner size={60} />}
            title={title}
          />
        </div>
      );
    case 'error':
      return (
        <div className="query-state">
          <NonIdealState
            action={<Button onClick={onActionClick}>Retry</Button>}
            icon={IconNames.Error}
            title={title}
          />
        </div>
      );
  }
}
