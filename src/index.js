import React from 'react';
import ReactDOM from 'react-dom';

// Components
import HomePage from './components/HomePage';
import LoadingPage from './components/LoadingPage';

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(<HomePage />, document.getElementById('root'));
    hasRendered = true;
  }
}

// Will be used when loading data from server.
// ReactDOM.render(<LoadingPage />, document.getElementById('root'));

ReactDOM.render(<HomePage />, document.getElementById('root'));

