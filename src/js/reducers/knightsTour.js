// @flow
import { INIT_FRAME, RESET_FRAME } from 'js/actions/knightsTour';
import type { T_Action } from 'js/flow-types';

const initialState = {};

const knightsTourReducer = (state = initialState, action:T_Action) => {
  
  switch (action.type) {

    case INIT_FRAME:
      return {
        ...state
      }

    case RESET_FRAME:
      return initialState;

    default:
      return state;
  }
}

export default knightsTourReducer;