const getApiRequestReducer = (actionType) => {
    
  return (state = {}, action) => {

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
        return {}

      default:
        return state;
    }
  }
}

export default getApiRequestReducer;