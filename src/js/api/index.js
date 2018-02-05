import { combineReducers } from 'redux';

import getApiRequestReducer from './api.reducerCreators';

import {
  FETCH_OR_CREATE_CLIENT_USER,
  FETCH_USERS,
  FETCH_GAMES,
  FETCH_GAME_CATEGORIES,
  FETCH_RESULTS,
  SAVE_NEW_RESULT
} from './api.actions';


export const apiReducers = combineReducers({
  clientUser: getApiRequestReducer(FETCH_OR_CREATE_CLIENT_USER),
  users: getApiRequestReducer(FETCH_USERS),
  games: getApiRequestReducer(FETCH_GAMES),
  gameCategories: getApiRequestReducer(FETCH_GAME_CATEGORIES),
  results: getApiRequestReducer(FETCH_RESULTS),
  newResult: getApiRequestReducer(SAVE_NEW_RESULT)
});