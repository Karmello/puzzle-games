const initialState = {
  number: 0,
  moves: 0
};

const roundReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'NEW_ROUND':
      return {
        ...state,
        number: action.payload.number,
        moves: 0
      }

    case 'MAKE_MOVE':
      return {
        ...state,
        moves: state.moves + 1
      }

    case 'END_ROUND':
      return {
        number: 0,
        moves: 0
      }

    default:
      return state;
  }
}

export default roundReducer;