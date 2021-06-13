import * as React from 'react';
import './Heading.scss';

interface HeadingProps {
  children?: React.ReactNode;
  right?: React.ReactNode;
}

export default function Heading({ children, right }: HeadingProps) {
  return (
    <div className="heading">
      {children}
      {right !== undefined ? (
        <div className="heading__right">{right}</div>
      ) : null}
    </div>
  );
}
