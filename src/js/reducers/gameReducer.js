const initialState = {
  id: undefined,
  isSolved: false,
  isLoading: false,
  options: {
    dimension: undefined,
    style: undefined
  }
};

const gameReducer = (state = initialState, action) => {
  
  switch (action.type) {
  
    case 'START_GAME':
      return {
        id: action.payload.id,
        isSolved: false,
        isLoading: true,
        options: {
          ...(action.payload.options || state.options)
        }
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
        isSolved: false,
        options: {
          dimension: undefined,
          style: undefined
        }
      }

    default:
      return state;
  }
}

export default gameReducer;