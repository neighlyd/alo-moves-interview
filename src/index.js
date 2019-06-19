import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

// Components
import HomePage from './components/HomePage';

// Styles
import './styles/styles.scss';

Modal.setAppElement('#root');

ReactDOM.render(<HomePage />, document.getElementById('root'));