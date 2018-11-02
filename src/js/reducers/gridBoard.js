// @flow
import { GRID_BOARD_SELECT_ELEMENT, GRID_BOARD_RESET } from 'js/actions/gridBoard';
import type { T_GridBoardState, T_Action } from 'js/flow-types';

const initialState = {
  selectedIndexes: []
};

const gridBoardReducer = (state:T_GridBoardState = initialState, action:T_Action) => {
  
  switch (action.type) {

    case GRID_BOARD_SELECT_ELEMENT:
      switch (action.meta.allowMultiSelect) {
        case false:
        default:
          return {
            ...state,
            selectedIndexes: [action.payload.index]
          }
        case true:
          return {
            ...state,
            selectedIndexes: [...state.selectedIndexes, action.payload.index]
          }
      }

    case GRID_BOARD_RESET:
      return initialState;

    default:
      return state;
  }
}

export default gridBoardReducer;