import axios from 'axios';
import { isEmpty } from 'lodash';
import { apiRequest, apiRequestSuccess, apiRequestFailure } from './api.actionCreators';

const baseURL = process.env.REACT_APP_API_URI;


export const CLIENT_USER_ACTION = 'CLIENT_USER_ACTION';
export const FETCH_GAMES = 'FETCH_GAMES';
export const FETCH_GAME_CATEGORIES = 'FETCH_GAME_CATEGORIES';
export const FETCH_HIGHSCORES = 'FETCH_HIGHSCORES';
export const FETCH_HIGHSCORE = 'FETCH_HIGHSCORE';
export const FETCH_USERS = 'FETCH_USERS';
export const SAVE_NEW_HIGHSCORE = 'SAVE_NEW_HIGHSCORE';


export const registerUser = user => {

  const api = axios.create({ baseURL });
  api.interceptors.response.use(res => ({ ...res, token: res.data.token, data: res.data.user }));

  return dispatch => {
    dispatch(apiRequest(CLIENT_USER_ACTION, { body: { ...user, password: user.password.replace(/./g, '*') } }));
    return api.post('/user/register', user).then(res => {
      localStorage.setItem('token', res.token);
      dispatch(apiRequestSuccess(CLIENT_USER_ACTION, res));
    }, err => dispatch(apiRequestFailure(CLIENT_USER_ACTION, err)));
  }
}

export const loginUser = credentials => {
  
  const api = axios.create({ baseURL });
  api.interceptors.response.use(res => ({ ...res, token: res.data.token, data: res.data.user }));

  return dispatch => {
    dispatch(apiRequest(CLIENT_USER_ACTION, {
      body: {
        ...credentials,
        password: credentials.password ? credentials.password.replace(/./g, '*') : undefined
      }
    }));
    return api.post('/user/login', credentials).then(res => {
      if (res.token) { localStorage.setItem('token', res.token); }
      dispatch(apiRequestSuccess(CLIENT_USER_ACTION, res));
    }, err => dispatch(apiRequestFailure(CLIENT_USER_ACTION, err)));
  }
}

export const updateUser = (username, updateQuery) => {

  const api = axios.create({ baseURL });

  return dispatch => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    dispatch(apiRequest(CLIENT_USER_ACTION, { headers, body: updateQuery }));
    return api.post(`user/${username}`, updateQuery, { headers }).then(
      res => dispatch(apiRequestSuccess(CLIENT_USER_ACTION, res)),
      err => dispatch(apiRequestFailure(CLIENT_USER_ACTION, err))
    );
  }
}

export const fetchUsers = () => {
  const api = axios.create({ baseURL });
  return dispatch => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    dispatch(apiRequest(FETCH_USERS, { headers }));
    return api.get('/users', { headers }).then(
      res => dispatch(apiRequestSuccess(FETCH_USERS, res)),
      err => dispatch(apiRequestFailure(FETCH_USERS, err))
    );
  }
}

export const fetchGames = () => {
  const api = axios.create({ baseURL });
  return dispatch => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    dispatch(apiRequest(FETCH_GAMES, { headers }));
    return api.get('/games', { headers }).then(
      res => dispatch(apiRequestSuccess(FETCH_GAMES, res)),
      err => dispatch(apiRequestFailure(FETCH_GAMES, err))
    );
  }
}

export const fetchGameCategories = () => {
  const api = axios.create({ baseURL });
  return dispatch => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    dispatch(apiRequest(FETCH_GAME_CATEGORIES, { headers }));
    return api.get('/game-categories', { headers }).then(
      res => dispatch(apiRequestSuccess(FETCH_GAME_CATEGORIES, res)),
      err => dispatch(apiRequestFailure(FETCH_GAME_CATEGORIES, err))
    );
  }
}

export const fetchHighscores = (gameId, query, delay) => {
  const api = axios.create({ baseURL });
  return dispatch => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    let url = `/highscores/${gameId}`;
    if (query && !isEmpty(query)) { url += `?mode=${query.mode}&dimension=${query.dimension}`; }
    dispatch(apiRequest(FETCH_HIGHSCORES, { headers, params: { gameId }, query }));
    return api.get(url, { headers }).then(res => {
      if (delay) {
        setTimeout(() => dispatch(apiRequestSuccess(FETCH_HIGHSCORES, res)), delay);
      } else {
        dispatch(apiRequestSuccess(FETCH_HIGHSCORES, res));
      }
    }, err => {
      if (delay) {
        setTimeout(() => dispatch(apiRequestFailure(FETCH_HIGHSCORES, err)), delay);
      } else {
        dispatch(apiRequestFailure(FETCH_HIGHSCORES, err));
      }
    });
  }
}

export const fetchHighscore = (gameId, query) => {
  const api = axios.create({ baseURL });
  return dispatch => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    let url = `/highscore/${gameId}`;
    if (query && !isEmpty(query)) { url += `?mode=${query.mode}&dimension=${query.dimension}`; }
    dispatch(apiRequest(FETCH_HIGHSCORE, { headers, params: { gameId }, query }));
    return api.get(url, { headers }).then(
      res => dispatch(apiRequestSuccess(FETCH_HIGHSCORE, res)),
      err => dispatch(apiRequestFailure(FETCH_HIGHSCORES, err))
    );
  }
}

export const saveNewHighscore = highscore => {
  const api = axios.create({ baseURL });
  return dispatch => {
    const headers = { 'x-access-token': localStorage.getItem('token') };
    dispatch(apiRequest(SAVE_NEW_HIGHSCORE, { headers, body: highscore }));
    return api.post('/highscore', highscore, { headers }).then(
      res => dispatch(apiRequestSuccess(SAVE_NEW_HIGHSCORE, res)),
      err => dispatch(apiRequestFailure(SAVE_NEW_HIGHSCORE, err))
    );
  }
}