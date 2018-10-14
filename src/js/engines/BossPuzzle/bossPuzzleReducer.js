// @flow

import { INIT_FRAME, SWITCH_TILES, CLEAR_HIDDEN_TILE_COORDS, RESET_FRAME } from './bossPuzzleActions';
import type { Action } from 'types/store';
import type { T_BossPuzzleEngine } from 'js/engines';

const initialState = {
  imgNumbers: [],
  imgIndex: undefined,
  tiles: [],
  hiddenTileCoords: { x: undefined, y: undefined }
};

const bossPuzzleReducer = (state:T_BossPuzzleEngine = initialState, action:Action) => {
  
  switch (action.type) {

    case INIT_FRAME:
      return {
        ...state,
        imgNumbers: action.payload.imgNumbers,
        imgIndex: action.payload.imgIndex,
        tiles: action.payload.tiles,
        hiddenTileCoords: action.payload.hiddenTileCoords
      }

    case SWITCH_TILES:

      const newState = {
        ...state,
        hiddenTileCoords: action.payload.hiddenTileCoords
      };

      const temp = newState.tiles[action.meta.index1];
      newState.tiles[action.meta.index1] = newState.tiles[action.meta.index2];
      newState.tiles[action.meta.index2] = temp;
      return newState;

    case CLEAR_HIDDEN_TILE_COORDS:
      return {
        ...state,
        hiddenTileCoords: {}
      }

    case RESET_FRAME:
      return initialState;

    default:
      return state;
  }
}

export default bossPuzzleReducer;