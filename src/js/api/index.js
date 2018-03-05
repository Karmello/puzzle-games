import { combineReducers } from 'redux';

import getApiRequestReducer from './api.reducerCreators';

import {
  REGISTER_OR_LOGIN_USER,
  FETCH_USERS,
  FETCH_GAMES,
  FETCH_GAME_CATEGORIES,
  FETCH_HIGHSCORES,
  SAVE_NEW_HIGHSCORE
} from './api.actions';


export const apiReducers = combineReducers({
  clientUser: getApiRequestReducer(REGISTER_OR_LOGIN_USER),
  users: getApiRequestReducer(FETCH_USERS),
  games: getApiRequestReducer(FETCH_GAMES),
  gameCategories: getApiRequestReducer(FETCH_GAME_CATEGORIES),
  highscores: getApiRequestReducer(FETCH_HIGHSCORES),
  newHighscore: getApiRequestReducer(SAVE_NEW_HIGHSCORE)
});