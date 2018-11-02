// @flow
export const GRID_BOARD_SELECT_ELEMENT = 'GRID_BOARD_SELECT_ELEMENT';
export const GRID_BOARD_RESET = 'GRID_BOARD_RESET';

export const selectElement = (index:number, allowMultiSelect:boolean) => ({
  type: GRID_BOARD_SELECT_ELEMENT,
  meta: {
    allowMultiSelect
  },
  payload: {
    index
  }
});

export const resetGridBoard = () => ({
  type: GRID_BOARD_RESET
});