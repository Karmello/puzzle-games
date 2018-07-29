// @flow

import type { Action } from 'types/store';
import type { ApiEndPoint } from 'types/api';


const getApiRequestReducer = (actionType:string) => {
  
  const initialState = {
    req: {
      isAwaiting: false
    },
    res: {
      config: {
        method: '',
        url: ''
      },
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
            isAwaiting: true,
            headers: action.payload.headers,
            params: action.payload.params,
            query: action.payload.query,
            body: action.payload.body
          }
        };

      case actionType + '_SUCCESS':
      case actionType + '_FAILURE':
        return {
          req: {
            ...state.req,
            isAwaiting: false
          },
          res: {
            config: action.payload.config,
            status: action.payload.status,
            statusText: action.payload.statusText,
            data: action.payload.data
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