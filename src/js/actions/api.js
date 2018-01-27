import axios from 'axios';
import { apiRequestSuccess, apiRequestFailure } from 'js/actionCreators';


const api = axios.create({ baseURL: process.env.REACT_APP_API_URI });

export const postUser = (user) => {
  return (dispatch) => {
    return api.post('/user', user).then(res => {
      dispatch(apiRequestSuccess('POST', 'USER', res));
    }, err => {
      dispatch(apiRequestFailure('POST', 'USER', err));
    });
  }
}

export const getUser = (query) => {
  return (dispatch) => {
    return api.get(`/user?${query}`).then(res => {
      dispatch(apiRequestSuccess('GET', 'USER', res));
    }, err => {
      dispatch(apiRequestFailure('GET', 'USER', err));
    });
  }
}

export const getGames = () => {
  return (dispatch) => {
    return api.get('/games').then(res => {

      // interception
      const data = {};
      for (const obj of res.data) { data[obj.id] = obj; }
      res.data = data;

      dispatch(apiRequestSuccess('GET', 'GAMES', res));
      
    }, err => {
      dispatch(apiRequestFailure('GET', 'GAMES', err));
    });
  }
}