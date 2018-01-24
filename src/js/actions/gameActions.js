export const startGame = (id, options) => {
  return {
    type: 'START_GAME',
    payload: {
      id: id,
      options: options
    }
  }
}

export const stopGameLoader = () => {
  return {
    type: 'STOP_GAME_LOADER'
  }
}

export const setAsSolved = () => {
  return {
    type: 'SET_AS_SOLVED'
  }
}

export const endGame = () => {
  return {
    type: 'END_GAME'
  }
}