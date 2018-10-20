// @flow
import { INIT_FRAME, RESET_FRAME } from 'js/actions/knightsTour';
import type { T_Action, T_KnightsTourEngine } from 'js/flow-types';

const initialState = {
  visited: [],
  active: -1
};

const knightsTourReducer = (state:T_KnightsTourEngine = initialState, action:T_Action) => {
  
  switch (action.type) {

    case INIT_FRAME:
      return {
        ...state,
        visited: action.payload.visited
      }

    case RESET_FRAME:
      return initialState;

    default:
      return state;
  }
}

export default knightsTourReducer;