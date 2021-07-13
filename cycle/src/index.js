import React from 'react';
import ReactDOM from 'react-dom';
import './componment/App.css';
import App from './componment/App';

import reportWebVitals from './componment/reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
  , document.getElementById('root')
);
reportWebVitals();
