import { combineReducers } from 'redux';

import gameReducer from 'js/pages/GamePage/game.reducer';

import { appReducer } from 'js/app';
import { apiReducers } from 'js/api';
import { pageReducers } from 'js/pages';
import { engineReducers } from 'js/engines';


export default combineReducers({
  api: apiReducers,
  app: appReducer,
  pages: pageReducers,
  engines: engineReducers,
  game: gameReducer
});