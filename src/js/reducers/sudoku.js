// @flow
import { SUDOKU_INIT_ENGINE, SUDOKU_CHANGE_VALUE, SUDOKU_RESET_ENGINE } from 'js/actions/sudoku';
import type { T_Action, T_SudokuEngine } from 'js/flow-types';

const initialState = {
  values: []
};

const sudokuReducer = (state:T_SudokuEngine = initialState, action:T_Action) => {
  
  switch (action.type) {

    case SUDOKU_INIT_ENGINE:
      return {
        ...state,
        values: action.payload.values
      }

    case SUDOKU_CHANGE_VALUE:
      const values = [...state.values];
      values[action.meta.index] = action.payload.newValue;
      return { ...state, values };

    case SUDOKU_RESET_ENGINE:
      return initialState;
  
    default:
      return state;
  }
}

export default sudokuReducer;