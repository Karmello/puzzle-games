// @flow

import { INIT_FRAME, MOVE_QUEEN, RESET_FRAME } from './eightQueensActions';
import type { Action,  } from 'types/store';
import type { T_EightQueensEngine } from 'js/engines';

const initialState = {
  queens: []
};

const eightQueensReducer = (state:T_EightQueensEngine = initialState, action:Action) => {
  
  switch (action.type) {

    case INIT_FRAME:
      return {
        ...state,
        queens: action.payload.queens
      }

    case MOVE_QUEEN:

      const queens = [...state.queens];
      queens[action.meta.fromIndex] = !queens[action.meta.fromIndex];
      queens[action.meta.toIndex] = !queens[action.meta.toIndex];

      return {
        ...state,
        queens
      }

    case RESET_FRAME:
      return initialState;

    default:
      return state;
  }
}

export default eightQueensReducer;