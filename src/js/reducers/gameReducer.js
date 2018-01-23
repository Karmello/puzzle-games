const initialState = {
  id: undefined,
  isSolved: false,
  isLoading: false
};

const gameReducer = (state = initialState, action) => {
  
  switch (action.type) {
  
    case 'START_GAME':
      return {
        id: action.payload.id,
        isSolved: false,
        isLoading: true
      }
  
    case 'STOP_GAME_LOADER':
      return {
        ...state,
        isLoading: false
      }

    case 'SET_AS_SOLVED':
      return {
        ...state,
        isSolved: true
      }

    case 'END_GAME':
      return {
        ...state,
        id: undefined,
        isSolved: false
      }

    default:
      return state;
  }
}

export default gameReducer;