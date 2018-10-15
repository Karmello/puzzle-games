// @flow

import type { T_ApiRequest, T_ApiResponse, T_ApiError } from 'js/api';

export const apiRequest = (actionType:string, req:T_ApiRequest) => {
  if (req) {
    return {
      type: actionType,
      payload: {
        headers: req.headers,
        params: req.params,
        query: req.query,
        body: req.body
      }
    }
  }
  return {
    type: actionType,
    payload: {}
  }
}

export const apiRequestSuccess = (actionType:string, res:T_ApiResponse) => ({
  type: `${actionType}_SUCCESS`,
  payload: {
    config: {
      method: res.config.method,
      url: res.config.url
    },
    status: res.status,
    statusText: res.statusText,
    data: res.data
  }
});

export const apiRequestFailure = (actionType:string, err:T_ApiError) => ({
  type: `${actionType}_FAILURE`,
  payload: {
    config: {
      method: err.config.method,
      url: err.config.url
    },
    status: err.response ? err.response.status : 400,
    statusText: err.response ? err.response.statusText : 'BAD_REQUEST',
    data: err.response ? err.response.data : undefined
  }
});

export const apiRequestClear = (actionType:string) => ({
  type: `${actionType}_CLEAR`
});