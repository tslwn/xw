import { Icon, Intent, Spinner } from '@blueprintjs/core';
import { IconNames, ICON_SIZE_LARGE } from '@blueprintjs/icons';
import classNames from 'classnames';
import * as React from 'react';
import { UseMutationResult } from 'react-query';
import FadeOut from './FadeOut';

interface MutationStatusIndicatorProps<TData, TError, TVariables, TContext> {
  className?: string;
  mutation: UseMutationResult<TData, TError, TVariables, TContext>;
}

export default function MutationStatusIndicator<
  TData,
  TError,
  TVariables,
  TContext
>({
  className,
  mutation,
}: MutationStatusIndicatorProps<
  TData,
  TError,
  TVariables,
  TContext
>): JSX.Element {
  const allClassNames = classNames('mutation-status-indicator', className);

  switch (mutation.status) {
    case 'idle':
      return <></>;
    case 'loading':
      return (
        <div className={allClassNames}>
          <Spinner size={Spinner.SIZE_SMALL} />
        </div>
      );
    case 'error':
      return (
        <FadeOut className={allClassNames}>
          <Icon
            icon={IconNames.Error}
            intent={Intent.DANGER}
            size={ICON_SIZE_LARGE}
          />
        </FadeOut>
      );
    case 'success':
      return (
        <FadeOut className={allClassNames}>
          <Icon
            icon={IconNames.Updated}
            intent={Intent.SUCCESS}
            size={ICON_SIZE_LARGE}
          />
        </FadeOut>
      );
  }
}
