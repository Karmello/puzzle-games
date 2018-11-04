// @flow
import { GAME_START, GAME_STOP_LOADER, GAME_MAKE_MOVE, GAME_SET_AS_SOLVED, GAME_END } from 'js/actions/game';
import type { T_Action, T_GameState } from 'js/flow-types';

const initialState = {
  id: '',
  options: {},
  moves: 0,
  isSolved: false,
  isLoading: true,
  doRestart: false
};

const gameReducer = (state:T_GameState = initialState, action:T_Action) => {
  
  switch (action.type) {
  
    case GAME_START:
      return {
        id: action.payload.id,
        options: action.payload.options,
        moves: 0,
        isSolved: false,
        isLoading: true,
        doRestart: action.payload.doRestart
      }
  
    case GAME_STOP_LOADER:
      return {
        ...state,
        doRestart: false,
        isLoading: false
      }

    case GAME_MAKE_MOVE:
      return {
        ...state,
        moves: state.moves + 1
      }

    case GAME_SET_AS_SOLVED:
      return {
        ...state,
        isSolved: true
      }

    case GAME_END:
      return {
        ...initialState,
        isLoading: false
      }

    default:
      return state;
  }
}

export default gameReducer;