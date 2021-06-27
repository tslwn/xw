import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

type LargeButtonLinkProps = React.ComponentProps<typeof Link>;

export default function LargeButtonLink({
  className,
  ...props
}: LargeButtonLinkProps) {
  return (
    <Link
      className={classNames(
        className,
        Classes.BUTTON,
        Classes.LARGE,
        Classes.OUTLINED
      )}
      {...props}
    />
  );
}
