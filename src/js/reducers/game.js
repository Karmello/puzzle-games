// @flow
import { START_GAME, STOP_GAME_LOADER, MAKE_MOVE, SET_AS_SOLVED, END_GAME } from 'js/actions/game';
import type { T_Action, T_GameSettings } from 'js/flow-types';

const initialState = {
  id: '',
  options: {},
  moves: 0,
  isSolved: false,
  isLoading: true,
  doRestart: false
};

const gameReducer = (state:T_GameSettings = initialState, action:T_Action) => {
  
  switch (action.type) {
  
    case START_GAME:
      return {
        id: action.payload.id,
        options: action.payload.options,
        moves: 0,
        isSolved: false,
        isLoading: true,
        doRestart: action.payload.doRestart
      }
  
    case STOP_GAME_LOADER:
      return {
        ...state,
        doRestart: false,
        isLoading: false
      }

    case MAKE_MOVE:
      return {
        ...state,
        moves: state.moves + 1
      }

    case SET_AS_SOLVED:
      return {
        ...state,
        isSolved: true
      }

    case END_GAME:
      return {
        ...initialState,
        isLoading: false
      }

    default:
      return state;
  }
}

export default gameReducer;