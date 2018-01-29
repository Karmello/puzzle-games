import axios from 'axios';
import { apiRequestSuccess, apiRequestFailure } from 'js/actionCreators';


export const CREATE_CLIENT_USER = 'CREATE_CLIENT_USER';
export const FETCH_CLIENT_USER = 'FETCH_CLIENT_USER';
export const FETCH_ALL_GAMES = 'FETCH_ALL_GAMES';
export const FETCH_ALL_RESULTS = 'FETCH_ALL_RESULTS';
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const SAVE_NEW_RESULT = 'SAVE_NEW_RESULT';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URI });

export const createClientUser = (user) => {
  return (dispatch) => {
    return api.post('/users', user).then(res => {
      dispatch(apiRequestSuccess(CREATE_CLIENT_USER, res));
    }, err => {
      dispatch(apiRequestFailure(CREATE_CLIENT_USER, err));
    });
  }
}

export const fetchClientUser = (fbId) => {
  return (dispatch) => {
    return api.get(`/users/${fbId}`).then(res => {
      dispatch(apiRequestSuccess(FETCH_CLIENT_USER, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_CLIENT_USER, err));
    });
  }
}

export const fetchAllGames = () => {
  return (dispatch) => {
    return api.get('/games').then(res => {
      dispatch(apiRequestSuccess(FETCH_ALL_GAMES, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_ALL_GAMES, err));
    });
  }
}

export const fetchAllResults = () => {
  return (dispatch) => {
    return api.get('/results').then(res => {
      dispatch(apiRequestSuccess(FETCH_ALL_RESULTS, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_ALL_RESULTS, err));
    });
  }
}

export const fetchAllUsers = () => {
  return (dispatch) => {
    return api.get('/users').then(res => {
      dispatch(apiRequestSuccess(FETCH_ALL_USERS, res));
    }, err => {
      dispatch(apiRequestFailure(FETCH_ALL_USERS, err));
    });
  }
}

export const saveNewResult = (result) => {
  return (dispatch) => {
    return api.post('/results', result).then(res => {
      dispatch(apiRequestSuccess(SAVE_NEW_RESULT, res));
    }, err => {
      dispatch(apiRequestFailure(SAVE_NEW_RESULT, err));
    });
  }
}