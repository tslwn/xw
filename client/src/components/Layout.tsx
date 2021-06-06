import classNames from 'classnames';
import * as React from 'react';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return <div className={classNames('layout', className)}>{children}</div>;
}
