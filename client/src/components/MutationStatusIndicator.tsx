import { Icon, Intent, Spinner } from '@blueprintjs/core';
import { IconNames, ICON_SIZE_LARGE } from '@blueprintjs/icons';
import * as React from 'react';
import { UseMutationResult } from 'react-query';
import FadeOut from './FadeOut';
import './MutationStatusIndicator.scss';

interface MutationStatusIndicatorProps<TData, TError, TVariables, TContext> {
  mutation: UseMutationResult<TData, TError, TVariables, TContext>;
}

export default function MutationStatusIndicator<
  TData,
  TError,
  TVariables,
  TContext
>({
  mutation,
}: MutationStatusIndicatorProps<
  TData,
  TError,
  TVariables,
  TContext
>): JSX.Element {
  switch (mutation.status) {
    case 'idle':
      return <></>;
    case 'loading':
      return (
        <div className="mutation-status-indicator">
          <Spinner size={Spinner.SIZE_SMALL} />
        </div>
      );
    case 'error':
      return (
        <FadeOut className="mutation-status-indicator">
          <Icon
            icon={IconNames.Error}
            intent={Intent.DANGER}
            size={ICON_SIZE_LARGE}
          />
        </FadeOut>
      );
    case 'success':
      return (
        <FadeOut className="mutation-status-indicator">
          <Icon
            icon={IconNames.Updated}
            intent={Intent.SUCCESS}
            size={ICON_SIZE_LARGE}
          />
        </FadeOut>
      );
  }
}
