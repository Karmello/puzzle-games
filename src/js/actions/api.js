// @flow
import axios from 'axios';
import * as qs from 'query-string';
import { isEmpty } from 'lodash';

import { apiRequest, apiRequestSuccess, apiRequestFailure } from 'js/creators/action/api';
import type { T_UserModel, T_HighscoreModel, T_GameOptionsModel } from 'js/flow-types';

const baseURL = process.env.REACT_APP_API_URI || '';

export const API_MAKE_AUTH_REQUEST = 'API_MAKE_AUTH_REQUEST';
export const API_FETCH_GAMES = 'API_FETCH_GAMES';
export const API_FETCH_GAME_CATEGORIES = 'API_FETCH_GAME_CATEGORIES';
export const API_FETCH_HIGHSCORES = 'API_FETCH_HIGHSCORES';
export const API_FETCH_HIGHSCORE = 'API_FETCH_HIGHSCORE';
export const API_FETCH_USERS = 'API_FETCH_USERS';
export const API_SAVE_NEW_HIGHSCORE = 'API_SAVE_NEW_HIGHSCORE';

export const registerUser = (user:T_UserModel) => {

  const api = axios.create({ baseURL });
  api.interceptors.response.use(res => ({ ...res, token: res.data.token, data: res.data.user }));

  return (dispatch:Function) => {
    dispatch(apiRequest(API_MAKE_AUTH_REQUEST, { body: { ...user, password: user.password.replace(/./g, '*') } }));
    return api.post('/user/register', user).then(res => {
      localStorage.setItem('token', res.token);
      dispatch(apiRequestSuccess(API_MAKE_AUTH_REQUEST, res));
    }, err => dispatch(apiRequestFailure(API_MAKE_AUTH_REQUEST, err)));
  }
}

export const loginUser = (credentials:T_UserModel|{token:string}) => {
  
  const api = axios.create({ baseURL });
  api.interceptors.response.use(res => ({ ...res, token: res.data.token, data: res.data.user }));

  return (dispatch:Function) => {
    dispatch(apiRequest(API_MAKE_AUTH_REQUEST, {
      body: {
        ...credentials,
        password: credentials.password ? String(credentials.password).replace(/./g, '*') : undefined
      }
    }));
    return api.post('/user/login', credentials).then(res => {
      if (res.token) { localStorage.setItem('token', res.token); }
      dispatch(apiRequestSuccess(API_MAKE_AUTH_REQUEST, res));
    }, err => dispatch(apiRequestFailure(API_MAKE_AUTH_REQUEST, err)));
  }
}

// export const updateUser = (username:string, updateQuery:{}) => {
//
//   const api = axios.create({ baseURL });
//
//   return (dispatch:Function) => {
//     const headers = { 'x-access-token': localStorage.getItem('token') };
//     dispatch(apiRequest(API_MAKE_AUTH_REQUEST, { headers, body: updateQuery }));
//     return api.post(`user/${username}`, updateQuery, { headers }).then(
//       res => dispatch(apiRequestSuccess(API_MAKE_AUTH_REQUEST, res)),
//       err => dispatch(apiRequestFailure(API_MAKE_AUTH_REQUEST, err))
//     );
//   }
// }

export const fetchUsers = () => {
  const api = axios.create({ baseURL });
  return (dispatch:Function) => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    dispatch(apiRequest(API_FETCH_USERS, { headers }));
    return api.get('/users', { headers }).then(
      res => dispatch(apiRequestSuccess(API_FETCH_USERS, res)),
      err => dispatch(apiRequestFailure(API_FETCH_USERS, err))
    );
  }
}

export const fetchGames = () => {
  const api = axios.create({ baseURL });
  return (dispatch:Function) => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    dispatch(apiRequest(API_FETCH_GAMES, { headers }));
    return api.get('/games', { headers }).then(
      res => dispatch(apiRequestSuccess(API_FETCH_GAMES, res)),
      err => dispatch(apiRequestFailure(API_FETCH_GAMES, err))
    );
  }
}

export const fetchGameCategories = () => {
  const api = axios.create({ baseURL });
  return (dispatch:Function) => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    dispatch(apiRequest(API_FETCH_GAME_CATEGORIES, { headers }));
    return api.get('/game-categories', { headers }).then(
      res => dispatch(apiRequestSuccess(API_FETCH_GAME_CATEGORIES, res)),
      err => dispatch(apiRequestFailure(API_FETCH_GAME_CATEGORIES, err))
    );
  }
}

export const fetchHighscores = (gameId:string, query:T_GameOptionsModel, delay:number) => {
  const api = axios.create({ baseURL });
  return (dispatch:Function) => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    let url = `/highscores/${gameId}`;
    if (query && !isEmpty(query)) { url += `?${qs.stringify(query)}`; }
    dispatch(apiRequest(API_FETCH_HIGHSCORES, { headers, params: { gameId }, query }));
    return api.get(url, { headers }).then(res => {
      if (delay) {
        setTimeout(() => dispatch(apiRequestSuccess(API_FETCH_HIGHSCORES, res)), delay);
      } else {
        dispatch(apiRequestSuccess(API_FETCH_HIGHSCORES, res));
      }
    }, err => {
      if (delay) {
        setTimeout(() => dispatch(apiRequestFailure(API_FETCH_HIGHSCORES, err)), delay);
      } else {
        dispatch(apiRequestFailure(API_FETCH_HIGHSCORES, err));
      }
    });
  }
}

export const fetchHighscore = (gameId:string, query:T_GameOptionsModel) => {
  const api = axios.create({ baseURL });
  return (dispatch:Function) => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    let url = `/highscore/${gameId}`;
    if (query && !isEmpty(query)) { url += `?${qs.stringify(query)}`; }
    dispatch(apiRequest(API_FETCH_HIGHSCORE, { headers, params: { gameId }, query }));
    return api.get(url, { headers }).then(
      res => dispatch(apiRequestSuccess(API_FETCH_HIGHSCORE, res)),
      err => dispatch(apiRequestFailure(API_FETCH_HIGHSCORES, err))
    );
  }
}

export const saveNewHighscore = (highscore:T_HighscoreModel) => {
  const api = axios.create({ baseURL });
  return (dispatch:Function) => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    dispatch(apiRequest(API_SAVE_NEW_HIGHSCORE, { headers, body: highscore }));
    return api.post('/highscore', highscore, { headers }).then(
      res => dispatch(apiRequestSuccess(API_SAVE_NEW_HIGHSCORE, res)),
      err => dispatch(apiRequestFailure(API_SAVE_NEW_HIGHSCORE, err))
    );
  }
}