// @flow
import {
  BOSS_PUZZLE_INIT_ENGINE,
  BOSS_PUZZLE_SWITCH_TILES,
  BOSS_PUZZLE_CLEAR_HIDDEN_TILE_COORDS,
  BOSS_PUZZLE_RESET_ENGINE
} from 'js/actions/bossPuzzle';

import type { T_Action, T_BossPuzzleEngine } from 'js/flow-types';

const initialState = {
  imgNumbers: [],
  imgIndex: undefined,
  tiles: [],
  hiddenTileCoords: { x: undefined, y: undefined }
};

const bossPuzzleReducer = (state:T_BossPuzzleEngine = initialState, action:T_Action) => {
  
  switch (action.type) {

    case BOSS_PUZZLE_INIT_ENGINE:
      return {
        ...state,
        imgNumbers: action.payload.imgNumbers,
        imgIndex: action.payload.imgIndex,
        tiles: action.payload.tiles,
        hiddenTileCoords: action.payload.hiddenTileCoords
      }

    case BOSS_PUZZLE_SWITCH_TILES:

      const newState = {
        ...state,
        hiddenTileCoords: action.payload.hiddenTileCoords
      };

      const temp = newState.tiles[action.meta.index1];
      newState.tiles[action.meta.index1] = newState.tiles[action.meta.index2];
      newState.tiles[action.meta.index2] = temp;
      return newState;

    case BOSS_PUZZLE_CLEAR_HIDDEN_TILE_COORDS:
      return {
        ...state,
        hiddenTileCoords: {}
      }

    case BOSS_PUZZLE_RESET_ENGINE:
      return initialState;

    default:
      return state;
  }
}

export default bossPuzzleReducer;