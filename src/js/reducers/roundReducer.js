const initialState = {
  number: 0
};

const roundReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'NEW_ROUND':
      return {
        ...state,
        number: action.payload.number
      }
      
    case 'END_ROUND':
      return {
        number: 0
      }

    default:
      return state;
  }
}

export default roundReducer;