// @flow
export const INIT_FRAME = 'INIT_FRAME';
export const RESET_FRAME = 'RESET_FRAME';

export const initFrame = (visited:Array<boolean>, active:number) => ({
  type: INIT_FRAME,
  payload: {
    visited,
    active
  }
});

export const resetFrame = () => ({
  type: RESET_FRAME
});