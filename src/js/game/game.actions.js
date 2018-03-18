export const START_GAME = 'START_GAME';
export const STOP_GAME_LOADER = 'STOP_GAME_LOADER';
export const MAKE_MOVE = 'MAKE_MOVE';
export const SET_AS_SOLVED = 'SET_AS_SOLVED';
export const END_GAME = 'END_GAME';

export const startGame = (id, options, doRestart) => {
  return {
    type: START_GAME,
    payload: {
      id: id,
      options: options,
      doRestart: doRestart
    }
  }
}

export const stopGameLoader = () => {
  return {
    type: STOP_GAME_LOADER
  }
}

export const makeMove = () => {
  return {
    type: MAKE_MOVE
  }
}

export const setAsSolved = () => {
  return {
    type: SET_AS_SOLVED
  }
}

export const endGame = () => {
  return {
    type: END_GAME
  }
}