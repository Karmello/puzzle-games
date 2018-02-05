import axios from 'axios';
import { apiRequest, apiRequestSuccess, apiRequestFailure } from './api.actionCreators';


const api = axios.create({ baseURL: process.env.REACT_APP_API_URI });

export const FETCH_OR_CREATE_CLIENT_USER = 'FETCH_OR_CREATE_CLIENT_USER';
export const FETCH_GAMES = 'FETCH_GAMES';
export const FETCH_GAME_CATEGORIES = 'FETCH_GAME_CATEGORIES';
export const FETCH_RESULTS = 'FETCH_RESULTS';
export const FETCH_USERS = 'FETCH_USERS';
export const SAVE_NEW_RESULT = 'SAVE_NEW_RESULT';

export const createClientUser = (user) => {
  return (dispatch) => {
    dispatch(apiRequest(FETCH_OR_CREATE_CLIENT_USER, { body: user }));
    return api.post('/users', user).then(res => {
      dispatch(apiRequestSuccess(FETCH_OR_CREATE_CLIENT_USER, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_OR_CREATE_CLIENT_USER, err));
    });
  }
}

export const fetchClientUser = (fbId) => {
  return (dispatch) => {
    dispatch(apiRequest(FETCH_OR_CREATE_CLIENT_USER, { params: { fbId } }));
    return api.get(`/users/${fbId}`).then(res => {
      dispatch(apiRequestSuccess(FETCH_OR_CREATE_CLIENT_USER, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_OR_CREATE_CLIENT_USER, err));
    });
  }
}

export const fetchGames = () => {
  return (dispatch) => {
    dispatch(apiRequest(FETCH_GAMES));
    return api.get('/games').then(res => {
      dispatch(apiRequestSuccess(FETCH_GAMES, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_GAMES, err));
    });
  }
}

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(apiRequest(FETCH_USERS));
    return api.get('/users').then(res => {
      dispatch(apiRequestSuccess(FETCH_USERS, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_USERS, err));
    });
  }
}

export const fetchResults = (gameId, query, delay) => {
  return (dispatch) => {
    dispatch(apiRequest(FETCH_RESULTS, { params: { gameId }, query }));
    return api.get(`/results/${gameId}`, { params: query }).then(res => {
      setTimeout(() => dispatch(apiRequestSuccess(FETCH_RESULTS, res)), delay);
    }, err => {
      setTimeout(() => dispatch(apiRequestFailure(FETCH_RESULTS, err)), delay);
    });
  }
}

export const saveNewResult = (result) => {
  return (dispatch) => {
    dispatch(apiRequest(SAVE_NEW_RESULT, { body: result }));
    return api.post('/results', result).then(res => {
      dispatch(apiRequestSuccess(SAVE_NEW_RESULT, res));
    }, err => {
      dispatch(apiRequestFailure(SAVE_NEW_RESULT, err));
    });
  }
}

export const fetchGameCategories = () => {
  return (dispatch) => {
    dispatch(apiRequest(FETCH_GAME_CATEGORIES));
    return api.get('/game-categories').then(res => {
      dispatch(apiRequestSuccess(FETCH_GAME_CATEGORIES, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_GAME_CATEGORIES, err));
    });
  }
}