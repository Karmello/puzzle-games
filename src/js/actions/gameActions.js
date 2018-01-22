export const toggleGameLoader = (show, mode, imgNumbers) => {
  
  const action = {
    type: 'TOGGLE_GAME_LOADER',
    payload: {
      isLoading: show
    }
  };

  if (show) {
    action.payload.mode = mode;
    action.payload.imgNumbers = imgNumbers;
  }

  return action;
}

export const endGame = () => {
  return {
    type: 'END_GAME'
  }
}