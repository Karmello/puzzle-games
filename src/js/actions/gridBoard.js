// @flow
import type { T_GridMap } from 'js/flow-types';

export const GRID_BOARD_INIT = 'GRID_BOARD_INIT';
export const GRID_BOARD_UPDATE = 'GRID_BOARD_UPDATE';
export const GRID_BOARD_GRAB_ELEMENT = 'GRID_BOARD_GRAB_ELEMENT';
export const GRID_BOARD_SELECT_ELEMENT = 'GRID_BOARD_SELECT_ELEMENT';
export const GRID_BOARD_RESET = 'GRID_BOARD_RESET';

export const initGridBoard = (gridMap:T_GridMap, isSelectable?:boolean) => ({
  type: GRID_BOARD_INIT,
  meta: {
    isSelectable
  },
  payload: {
    gridMap
  }
});

export const updateGridBoard = (gridMap:T_GridMap, isSelectable?:boolean) => ({
  type: GRID_BOARD_UPDATE,
  meta: {
    isSelectable
  },
  payload: {
    gridMap
  }
});

export const grabElement = (index:number) => ({
  type: GRID_BOARD_GRAB_ELEMENT,
  payload: {
    index
  }
});

export const selectElement = (index:number, allowMultiSelect?:boolean) => ({
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