// @flow
export const EIGHT_QUEENS_INIT_ENGINE = 'EIGHT_QUEENS_INIT_ENGINE';
export const EIGHT_QUEENS_MOVE_QUEEN = 'MOVE_QUEEN';
export const EIGHT_QUEENS_RESET_ENGINE = 'EIGHT_QUEENS_RESET_ENGINE';

export const initEngine = (queens:Array<boolean>) => ({
  type: EIGHT_QUEENS_INIT_ENGINE,
  payload: {
    queens
  }
});

export const moveQueen = (fromIndex:number, toIndex:number) => ({
  type: EIGHT_QUEENS_MOVE_QUEEN,
  meta: { fromIndex, toIndex }
});

export const resetEngine = () => ({
  type: EIGHT_QUEENS_RESET_ENGINE
});
