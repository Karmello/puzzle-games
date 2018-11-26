// @flow
import {
  GRID_BOARD_INIT,
  GRID_BOARD_UPDATE,
  GRID_BOARD_GRAB_ELEMENT,
  GRID_BOARD_SELECT_ELEMENT,
  GRID_BOARD_RESET
} from 'js/actions/gridBoard';

import type { T_GridBoardState, T_Action } from 'js/flow-types';

const initialState = {
  gridMap: {},
  grabbedIndex: -1
};

const gridBoardReducer = (state:T_GridBoardState = initialState, action:T_Action) => {
    
  const gridMap = {};

  switch (action.type) {

    case GRID_BOARD_INIT:
      for (const key in action.payload.gridMap) {
        gridMap[key] = { isOccupied: action.payload.gridMap[key] };
        if (action.meta.isSelectable) { gridMap[key].isSelected = false; }
      }
      return {
        gridMap,
        grabbedIndex: state.grabbedIndex
      }

    case GRID_BOARD_UPDATE:
      for (const key in action.payload.gridMap) {
        gridMap[key] = { isOccupied: action.payload.gridMap[key] };
      }
      if (action.meta.isSelectable) {
        for (const key in state.gridMap) {
          if (state.gridMap[Number(key)].isOccupied && !gridMap[key].isOccupied) {
            gridMap[key].isSelected = false;
          } else if (!state.gridMap[Number(key)].isOccupied && gridMap[key].isOccupied) {
            gridMap[key].isSelected = true;
          } else {
            gridMap[key].isSelected = state.gridMap[Number(key)].isSelected;
          }
        }   
      }
      return {
        gridMap,
        grabbedIndex: state.grabbedIndex
      }

    case GRID_BOARD_SELECT_ELEMENT:
      for (const key in state.gridMap) {
        gridMap[key] = { ...state.gridMap[Number(key)]}
        if (!action.meta.allowMultiSelect) { gridMap[key].isSelected = false; }
      }
      if (gridMap[action.payload.index].isOccupied) {
        gridMap[action.payload.index].isSelected = true;
      }
      return {
        gridMap,
        grabbedIndex: state.grabbedIndex
      };

    case GRID_BOARD_GRAB_ELEMENT:
      for (const key in state.gridMap) {
        gridMap[key] = { ...state.gridMap[Number(key)] };
      }
      return {
        gridMap,
        grabbedIndex: gridMap[action.payload.index].isOccupied ? action.payload.index : state.grabbedIndex
      };

    case GRID_BOARD_RESET:
      return initialState;

    default:
      return state;
  }
}

export default gridBoardReducer;