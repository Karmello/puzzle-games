import { combineReducers } from 'redux';

import { apiReducers } from 'js/api';
import { appReducer } from 'js/app';
import { pageReducers } from 'js/pages';
import { engineReducers } from 'js/engines';


export default combineReducers({
  api: apiReducers,
  app: appReducer,
  pages: pageReducers,
  engines: engineReducers
});