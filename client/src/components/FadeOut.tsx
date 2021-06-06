import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import './FadeOut.scss';

interface FadeOutProps {
  children: React.ReactNode;
}

export default function FadeOut({ children }: FadeOutProps): JSX.Element {
  const ref = React.useRef(null);

  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setShow(false);
  }, []);

  return (
    <CSSTransition
      classNames="fade-out"
      in={show}
      nodeRef={ref}
      timeout={1000}
      unmountOnExit
    >
      <div ref={ref}>{children}</div>
    </CSSTransition>
  );
}
