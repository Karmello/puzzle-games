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
export type T_ApiRequest = {
  isAwaiting?:boolean,
  headers?:{},
  params?:{},
  query?:{},
  body?:{}
};

export type T_ApiResponse = {
  config:{
    method:string,
    url:string
  },
  status:number,
  statusText:string,
  data:any
};

export type T_ApiError = {
  config:{
    method:string,
    url:string
  },
  response:{
    status:number,
    statusText:string,
    data:any
  }
};

export type T_ApiEndPoint = {
  req:T_ApiRequest,
  res:T_ApiResponse
};

export type T_ApiEntities = {
  clientUser:T_ApiEndPoint,
  games:T_ApiEndPoint,
  gameCategories:T_ApiEndPoint,
  highscores:T_ApiEndPoint,
  bestHighscore:T_ApiEndPoint,
  newHighscore:T_ApiEndPoint
};

export type T_UserModel = {
  username:string,
  password:string
};

export type T_GameModel = {
  id:string,
  categoryId:string,
  name:string,
  description:string
};

export type T_GameOptionsModel = {
  mode?:string,
  dimension?:string
};

export type T_HighscoreModel = {
  username:string,
  gameId:string,
  options:T_GameOptionsModel,
  details:{ moves:number, seconds:number }
};