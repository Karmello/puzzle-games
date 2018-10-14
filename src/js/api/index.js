// @flow

import { combineReducers } from 'redux';

import getApiRequestReducer from './apiReducerCreators';

import {
  CLIENT_USER_ACTION,
  FETCH_USERS,
  FETCH_GAMES,
  FETCH_GAME_CATEGORIES,
  FETCH_HIGHSCORES,
  FETCH_HIGHSCORE,
  SAVE_NEW_HIGHSCORE
} from './apiActions';

// reducer
export const apiReducers = combineReducers({
  clientUser: getApiRequestReducer(CLIENT_USER_ACTION),
  users: getApiRequestReducer(FETCH_USERS),
  games: getApiRequestReducer(FETCH_GAMES),
  gameCategories: getApiRequestReducer(FETCH_GAME_CATEGORIES),
  highscores: getApiRequestReducer(FETCH_HIGHSCORES),
  bestHighscore: getApiRequestReducer(FETCH_HIGHSCORE),
  newHighscore: getApiRequestReducer(SAVE_NEW_HIGHSCORE)
});

// flow types
export type T_ApiEntities = {
  clientUser:any,
  bestHighscore:any,
  newHighscore:any,
  gameCategories:any,
  games:any,
  highscores:any
};