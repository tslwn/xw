import * as React from 'react';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
  heading: React.ReactNode;
  className?: string;
  sidebar?: React.ReactNode;
}

export default function Layout({
  children,
  className,
  heading,
  sidebar,
}: LayoutProps) {
  return (
    <>
      <div className="layout__heading">{heading}</div>
      <div className="layout__container">
        {sidebar !== undefined ? (
          <div className="layout__sidebar">{sidebar}</div>
        ) : null}
        <div className="layout__body">{children}</div>
      </div>
    </>
  );
}
