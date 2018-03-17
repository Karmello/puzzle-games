export const INIT_FRAME = 'INIT_FRAME';
export const RESET_FRAME = 'RESET_FRAME';

export const initFrame = queens => {
  return {
    type: INIT_FRAME,
    payload: {
      queens
    }
  }
}

export const resetFrame = () => {
  return {
    type: RESET_FRAME
  }
}