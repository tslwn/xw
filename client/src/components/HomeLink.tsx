import { H3 } from '@blueprintjs/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import './HomeLink.scss';

export default function HomeLink() {
  return (
    <Link className="home-link" to={'/'}>
      <H3 className="home-link__text">xw</H3>
    </Link>
  );
}
