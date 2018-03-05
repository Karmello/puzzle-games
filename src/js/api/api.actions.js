import axios from 'axios';
import { apiRequest, apiRequestSuccess, apiRequestFailure } from './api.actionCreators';

const baseURL = process.env.REACT_APP_API_URI;

export const REGISTER_OR_LOGIN_USER = 'REGISTER_OR_LOGIN_USER';
export const FETCH_GAMES = 'FETCH_GAMES';
export const FETCH_GAME_CATEGORIES = 'FETCH_GAME_CATEGORIES';
export const FETCH_HIGHSCORES = 'FETCH_HIGHSCORES';
export const FETCH_USERS = 'FETCH_USERS';
export const SAVE_NEW_HIGHSCORE = 'SAVE_NEW_HIGHSCORE';

export const registerUser = user => {
  const api = axios.create({ baseURL });
  return dispatch => {
    dispatch(apiRequest(REGISTER_OR_LOGIN_USER, { body: user }));
    return api.post('/user/register', user).then(res => {
      dispatch(apiRequestSuccess(REGISTER_OR_LOGIN_USER, res));
    }, err => {
      dispatch(apiRequestFailure(REGISTER_OR_LOGIN_USER, err));
    });
  }
}

export const loginUser = credentials => {
  const api = axios.create({ baseURL });
  return dispatch => {
    dispatch(apiRequest(REGISTER_OR_LOGIN_USER, { body: credentials }));
    return api.post('/user/login', credentials).then(res => {
      dispatch(apiRequestSuccess(REGISTER_OR_LOGIN_USER, res));
    }, err => {
      dispatch(apiRequestFailure(REGISTER_OR_LOGIN_USER, err));
    });
  }
}

export const fetchUsers = () => {
  const api = axios.create({ baseURL });
  return dispatch => {
    dispatch(apiRequest(FETCH_USERS));
    return api.get('/users').then(res => {
      dispatch(apiRequestSuccess(FETCH_USERS, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_USERS, err));
    });
  }
}

export const fetchGames = () => {
  const api = axios.create({ baseURL });
  return dispatch => {
    dispatch(apiRequest(FETCH_GAMES));
    return api.get('/games').then(res => {
      dispatch(apiRequestSuccess(FETCH_GAMES, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_GAMES, err));
    });
  }
}

export const fetchGameCategories = () => {
  const api = axios.create({ baseURL });
  return dispatch => {
    dispatch(apiRequest(FETCH_GAME_CATEGORIES));
    return api.get('/game-categories').then(res => {
      dispatch(apiRequestSuccess(FETCH_GAME_CATEGORIES, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_GAME_CATEGORIES, err));
    });
  }
}

export const fetchHighscores = (gameId, query, delay) => {
  const api = axios.create({ baseURL });
  return dispatch => {
    dispatch(apiRequest(FETCH_HIGHSCORES, { params: { gameId }, query }));
    return api.get(`/highscores/${gameId}`, { params: query }).then(res => {
      setTimeout(() => dispatch(apiRequestSuccess(FETCH_HIGHSCORES, res)), delay);
    }, err => {
      setTimeout(() => dispatch(apiRequestFailure(FETCH_HIGHSCORES, err)), delay);
    });
  }
}

export const saveNewHighscore = highscore => {
  const api = axios.create({ baseURL });
  return dispatch => {
    dispatch(apiRequest(SAVE_NEW_HIGHSCORE, { body: highscore }));
    return api.post('/highscore', highscore).then(res => {
      dispatch(apiRequestSuccess(SAVE_NEW_HIGHSCORE, res));
    }, err => {
      dispatch(apiRequestFailure(SAVE_NEW_HIGHSCORE, err));
    });
  }
}