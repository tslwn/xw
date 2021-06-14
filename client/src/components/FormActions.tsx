import * as React from 'react';
import './FormActions.scss';

interface FormActionsProps {
  children: React.ReactNode;
}

export default function FormActions({ children }: FormActionsProps) {
  return <div className="form-actions">{children}</div>;
}
