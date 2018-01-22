export const newRound = (number) => {
  return {
    type: 'NEW_ROUND',
    payload: {
      number: number
    }
  }
}

export const makeMove = () => {
  return {
    type: 'MAKE_MOVE'
  }
}

export const endRound = () => {
  return {
    type: 'END_ROUND'
  }
}