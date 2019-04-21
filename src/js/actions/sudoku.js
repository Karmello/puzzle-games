// @flow
export const SUDOKU_INIT_ENGINE = 'SUDOKU_INIT_ENGINE';
export const SUDOKU_CHANGE_VALUE = 'SUDOKU_CHANGE_VALUE';
export const SUDOKU_RESET_ENGINE = 'SUDOKU_RESET_ENGINE';

export const initEngine = (values:Array<number|null>) => ({
  type: SUDOKU_INIT_ENGINE,
  payload: {
    values
  }
});

export const changeValue = (index:number, newValue:number) => ({
  type: SUDOKU_CHANGE_VALUE,
  meta: {
    index
  },
  payload: {
    newValue
  }
});

export const resetEngine = () => ({
  type: SUDOKU_RESET_ENGINE
});
