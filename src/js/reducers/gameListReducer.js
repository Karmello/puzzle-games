const initialState = {
  'BossPuzzle': {
    options: { dimension: 3, style: 'IMG' }
  }
};

const gameListReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'CHANGE_GAME_OPTIONS':
      return {
        ...state,
        [action.meta.id]: {
          ...state[action.meta.id],
          options: {
            ...action.payload.options
          }
        } 
      }

    default:
      return state;
  }
}

export default gameListReducer;