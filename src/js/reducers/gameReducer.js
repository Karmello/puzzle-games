const initialState = {
  id: undefined,
  isLoading: false,
  isSolved: false
};

const gameReducer = (state = initialState, action) => {
  
  switch (action.type) {
  
    case 'TOGGLE_GAME_LOADER':
      return {
        id: action.payload.id || state.id,
        isLoading: action.payload.isLoading,
        isSolved: false
      }
  
    case 'SET_AS_SOLVED':
      return {
        ...state,
        isSolved: true
      }

    case 'END_GAME':
      return {
        ...state,
        id: undefined
      }

    default:
      return state;
  }
}

export default gameReducer;