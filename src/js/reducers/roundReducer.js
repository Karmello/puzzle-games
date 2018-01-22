const initialState = {
  number: 0,
  moves: 0,
  isSolved: false
};

const roundReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'NEW_ROUND':
      return {
        ...state,
        number: action.payload.number,
        moves: 0,
        isSolved: false
      }

    case 'MAKE_MOVE':
      return {
        ...state,
        moves: state.moves + 1
      }

    case 'SET_AS_SOLVED':
      return {
        ...state,
        isSolved: true
      }

    case 'END_ROUND':
      return {
        number: 0,
        moves: 0,
        isSolved: false
      }

    default:
      return state;
  }
}

export default roundReducer;