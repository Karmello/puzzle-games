const getApiRequestReducer = (actionType) => {
  
  const initialState = {
    isAwaiting: false,
    method: '',
    params: {},
    url: '',
    status: undefined,
    statusText: '',
    data: []
  }

  return (state = initialState, action) => {

    switch (action.type) {
  
      case actionType:
        return {
          ...state,
          isAwaiting: action.payload.isAwaiting
        }

      case actionType + '_SUCCESS':
      case actionType + '_FAILURE':
        return { ...action.payload }

      case actionType + '_CLEAR':
        return initialState;

      default:
        return state;
    }
  }
}

export default getApiRequestReducer;