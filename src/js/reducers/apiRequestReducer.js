const getApiRequestReducer = (actionType) => {
  
  const initialState = {
    isFetching: false,
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
          isFetching: action.payload.isFetching
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