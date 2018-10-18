// @flow
export const INIT_FRAME = 'INIT_FRAME';
export const MOVE_QUEEN = 'MOVE_QUEEN';
export const RESET_FRAME = 'RESET_FRAME';

export const initFrame = (queens:Array<boolean>) => ({
  type: INIT_FRAME,
  payload: {
    queens
  }
});

export const moveQueen = (fromIndex:number, toIndex:number) => ({
  type: MOVE_QUEEN,
  meta: { fromIndex, toIndex }
});

export const resetFrame = () => ({
  type: RESET_FRAME
});