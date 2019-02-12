// @flow
import { TETRIS_INIT_ENGINE, TETRIS_RESET_ENGINE } from 'js/actions/tetris';
import type { T_Action, T_TetrisEngine } from 'js/flow-types';

const initialState = {
  blocks: []
};

const tetrisReducer = (state:T_TetrisEngine = initialState, action:T_Action) => {

  switch (action.type) {

    case TETRIS_INIT_ENGINE:
      return action.payload;

    case TETRIS_RESET_ENGINE:
      return initialState;

    default:
      return state;
  }
}

export default tetrisReducer;