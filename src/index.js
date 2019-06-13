import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoadingPage from './components/LoadingPage';

let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(<App />, document.getElementById('root'));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('root'));
