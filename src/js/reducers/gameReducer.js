const initialState = {
  isLoading: false,
  id: undefined,
  imgNumbers: []
};

const gameReducer = (state = initialState, action) => {
  
  switch (action.type) {
  
    case 'TOGGLE_GAME_LOADER':
      return {
        isLoading: action.payload.isLoading,
        id: action.payload.id || state.id,
        imgNumbers: action.payload.imgNumbers || state.imgNumbers
      }
  
    case 'END_GAME':
      return {
        ...state,
        id: undefined,
        imgNumbers: []
      }

    default:
      return state;
  }
}

export default gameReducer;