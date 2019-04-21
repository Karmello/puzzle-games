// @flow
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import reducers from 'js/reducers';

export const createNewStore = () => {
  if (process.env.NODE_ENV !== 'development') {
    return createStore(reducers, applyMiddleware(thunkMiddleware));
  } else {
    return createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))));
  }
}

export default createNewStore();
