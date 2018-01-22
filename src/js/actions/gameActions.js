export const toggleGameLoader = (show, id, imgNumbers) => {
  
  const action = {
    type: 'TOGGLE_GAME_LOADER',
    payload: {
      isLoading: show
    }
  };

  if (show) {
    action.payload.id = id;
    action.payload.imgNumbers = imgNumbers;
  }

  return action;
}

export const endGame = () => {
  return {
    type: 'END_GAME'
  }
}