// @flow
import { KNIGHTS_TOUR_INIT_ENGINE, KNIGHTS_TOUR_MOVE_KNIGHT, KNIGHTS_TOUR_RESET_ENGINE } from 'js/actions/knightsTour';
import type { T_Action, T_KnightsTourEngine } from 'js/flow-types';

const initialState = {
  visited: [],
  active: -1
};

const knightsTourReducer = (state:T_KnightsTourEngine = initialState, action:T_Action) => {
  
  switch (action.type) {

    case KNIGHTS_TOUR_INIT_ENGINE:
      return action.payload;
  
    case KNIGHTS_TOUR_MOVE_KNIGHT:
      const newState = {
        visited: [...state.visited],
        active: action.payload.newIndex
      };
      newState.visited[action.payload.newIndex] = true;
      return newState;

    case KNIGHTS_TOUR_RESET_ENGINE:
      return initialState;

    default:
      return state;
  }
}

export default knightsTourReducer;