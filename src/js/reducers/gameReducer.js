const initialState = {
  id: undefined,
  isLoading: false
};

const gameReducer = (state = initialState, action) => {
  
  switch (action.type) {
  
    case 'TOGGLE_GAME_LOADER':
      return {
        id: action.payload.id || state.id,
        isLoading: action.payload.isLoading
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