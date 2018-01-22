const initialState = {
  isLoading: false,
  mode: 'OFF',
  imgNumbers: []
};

const gameReducer = (state = initialState, action) => {
  
  switch (action.type) {
  
    case 'TOGGLE_GAME_LOADER':
      return {
        isLoading: action.payload.isLoading,
        mode: action.payload.mode || state.mode,
        imgNumbers: action.payload.imgNumbers || state.imgNumbers
      }
  
    case 'END_GAME':
      return {
        ...state,
        mode: 'OFF',
        imgNumbers: []
      }

    default:
      return state;
  }
}

export default gameReducer;