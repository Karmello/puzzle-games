// @flow
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import reducers from 'js/reducers';


let store;

if (process.env.NODE_ENV !== 'development') {
  store = createStore(reducers, applyMiddleware(thunkMiddleware));

} else {
  store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))));
}

export const createNewStore = () => createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))));

export default store;