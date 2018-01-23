export const startGame = (id) => {
  return {
    type: 'START_GAME',
    payload: {
      id: id
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