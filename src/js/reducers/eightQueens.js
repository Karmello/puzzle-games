// @flow
import { EIGHT_QUEENS_INIT_ENGINE, EIGHT_QUEENS_MOVE_QUEEN, EIGHT_QUEENS_RESET_ENGINE } from 'js/actions/eightQueens';
import type { T_Action, T_EightQueensEngine } from 'js/flow-types';

const initialState = {
  queens: []
};

const eightQueensReducer = (state:T_EightQueensEngine = initialState, action:T_Action) => {
  
  switch (action.type) {

    case EIGHT_QUEENS_INIT_ENGINE:
      return {
        ...state,
        queens: action.payload.queens
      }

    case EIGHT_QUEENS_MOVE_QUEEN:

      const queens = [...state.queens];
      queens[action.meta.fromIndex] = !queens[action.meta.fromIndex];
      queens[action.meta.toIndex] = !queens[action.meta.toIndex];

      return {
        ...state,
        queens
      }

    case EIGHT_QUEENS_RESET_ENGINE:
      return initialState;

    default:
      return state;
  }
}

export default eightQueensReducer;