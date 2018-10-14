// @flow

import { INIT_FRAME, CHANGE_VALUE, RESET_FRAME } from './sudokuActions';
import type { Action } from 'types/store';
import type { T_SudokuEngine } from 'js/engines';

const initialState = {
  values: []
};

const sudokuReducer = (state:T_SudokuEngine = initialState, action:Action) => {
  
  switch (action.type) {

    case INIT_FRAME:
      return {
        ...state,
        values: action.payload.values
      }

    case CHANGE_VALUE:
      const values = [...state.values];
      values[action.meta.index] = action.payload.newValue;
      return { ...state, values };

    case RESET_FRAME:
      return initialState;
  
    default:
      return state;
  }
}

export default sudokuReducer;