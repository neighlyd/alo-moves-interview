import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import Modal from 'react-modal';

// Components
import HomePage from './components/HomePage';
import LoadingPage from './components/LoadingPage';
import { startSetComments } from './redux/actions/comments';

// Styles
import './styles/styles.scss';

const store = configureStore();
Modal.setAppElement('#root');

const jsx = (
  <Provider store={store}>
    <HomePage />
  </Provider>
)

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
}

// Show the Loading Page while we retrieve the comments array from Firebase.
ReactDOM.render(<LoadingPage />, document.getElementById('root'));

store.dispatch(startSetComments()).then(() => {
  renderApp()
});