const getApiRequestReducer = (actionType) => {
  
  const initialState = {
    req: {
      isAwaiting: false
    },
    res: {
      data: []
    }
  };

  return (state = initialState, action) => {

    switch (action.type) {
  
      case actionType:
        return {
          ...state,
          req: {
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