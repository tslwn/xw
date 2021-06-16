import { IconNames, Icons } from '@blueprintjs/icons';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppProviders from './AppProviders';
import reportWebVitals from './reportWebVitals';

// https://blueprintjs.com/docs/versions/4/#icons/loading-icons
Icons.load([IconNames.Error, IconNames.Offline, IconNames.Search]);

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
