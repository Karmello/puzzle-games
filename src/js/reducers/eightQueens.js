// @flow
import { INIT_FRAME, MOVE_QUEEN, RESET_FRAME } from 'js/actions/eightQueens';
import type { T_Action, T_EightQueensEngine } from 'js/flow-types';

const initialState = {
  queens: []
};

const eightQueensReducer = (state:T_EightQueensEngine = initialState, action:T_Action) => {
  
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