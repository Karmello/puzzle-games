const getApiRequestReducer = (subject) => {
  
  return (state = {}, action) => {

    if (action.type.indexOf(subject + '_SUCCESS') > -1) {

      return {
        status: action.payload.status,
        statusText: action.payload.statusText,
        data: action.payload.data
      }

    } else if (action.type.indexOf(subject + '_FAILURE') > -1) {
      
      return {
        status: action.payload.status,
        statusText: action.payload.statusText,
        data: undefined
      }
    
    } else {
      return state;
    }
  }
}

export default getApiRequestReducer;