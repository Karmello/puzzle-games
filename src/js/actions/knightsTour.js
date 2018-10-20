// @flow
export const INIT_FRAME = 'INIT_FRAME';
export const RESET_FRAME = 'RESET_FRAME';

export const initFrame = () => ({
  type: INIT_FRAME
});

export const resetFrame = () => ({
  type: RESET_FRAME
});