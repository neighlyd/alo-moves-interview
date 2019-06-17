import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import commentReducer from '../reducers/comments';

// used to inject redux store viewer into Chrome. Great for debugging.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create our store by combining our reducers. We only have 1 at the moment, but let's future proof this, shall we?
export default () => {
  const store = createStore(
    combineReducers({
      comments: commentReducer
    }),
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )
  return store
};