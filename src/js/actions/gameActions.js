export const toggleGameLoader = (show, id) => {
  
  const action = {
    type: 'TOGGLE_GAME_LOADER',
    payload: {
      isLoading: show
    }
  };

  if (show) {
    action.payload.id = id;
  }

  return action;
}

export const endGame = () => {
  return {
    type: 'END_GAME'
  }
}