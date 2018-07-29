// @flow

import type { Action } from 'types/store';
import type { ApiEndPoint } from 'types/api';

const getApiRequestReducer = (actionType:string) => {
  
  const initialState = {
    req: {
      isAwaiting: false,
      method: '',
      url: ''
    },
    res: {
      status: 0,
      statusText: '',
      data: undefined
    }
  };

  return (state:ApiEndPoint = initialState, action:Action) => {

    switch (action.type) {
  
      case actionType:
        return {
          ...state,
          req: {
            headers: action.payload.headers,
            params: action.payload.params,
            query: action.payload.query,
            body: action.payload.body,
            isAwaiting: true
          }
        };

      case actionType + '_SUCCESS':
      case actionType + '_FAILURE':
        return {
          req: {
            ...state.req,
            method: action.payload.method,
            url: action.payload.url,
            isAwaiting: false
          },
          res: {
            status: action.payload.status,
            statusText: action.payload.statusText,
            data: action.payload.data,
          }
        };

      case actionType + '_CLEAR':
        return initialState;

      default:
        return state;
    }
  }
}

export default getApiRequestReducer;