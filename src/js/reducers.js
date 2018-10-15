// @flow

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { apiReducers } from 'js/api';
import { appReducer } from 'js/app';
import { pageReducers } from 'js/pages';
import gameReducer from 'js/game/gameReducer';
import { engineReducers } from 'js/engines';


// reducers
export default combineReducers({
  api: apiReducers,
  app: appReducer,
  pages: pageReducers,
  game: gameReducer,
  engines: engineReducers,
  form: formReducer
});

// flow types
export type T_Action = {
  type:string,
  meta: {
    [key:string]:any
  },
  payload:{
    [key:string]:any
  }
};