// @flow
import { GRID_BOARD_INIT } from 'js/actions/gridBoard';

import type { T_GridBoardState, T_Action } from 'js/flow-types';

const initialState = {
  elementsMap:[]
};

const gridBoardReducer = (state:T_GridBoardState = initialState, action:T_Action) => {
  
  switch (action.type) {

    case GRID_BOARD_INIT:
      break;

    default:
      return state;
  }
}

export default gridBoardReducer;