// @flow
import type { T_Coords } from 'js/flow-types';

export const BOSS_PUZZLE_INIT_ENGINE = 'BOSS_PUZZLE_INIT_ENGINE';
export const BOSS_PUZZLE_SWITCH_TILES = 'BOSS_PUZZLE_SWITCH_TILES';
export const BOSS_PUZZLE_CLEAR_HIDDEN_TILE_COORDS = 'BOSS_PUZZLE_CLEAR_HIDDEN_TILE_COORDS';
export const BOSS_PUZZLE_RESET_ENGINE = 'BOSS_PUZZLE_RESET_ENGINE';

export const initEngine = (imgNumbers:Array<number>, imgIndex:number, tiles:Array<number>, hiddenTileCoords:T_Coords) => ({
  type: BOSS_PUZZLE_INIT_ENGINE,
  payload: {
    imgNumbers,
    imgIndex,
    tiles,
    hiddenTileCoords
  }
});

export const switchTiles = (index1:number, index2:number, hiddenTileCoords:T_Coords) => ({
  type: BOSS_PUZZLE_SWITCH_TILES,
  meta: {
    index1,
    index2
  },
  payload: {
    hiddenTileCoords
  }
});

export const clearHiddenTileCoords = () => ({
  type: BOSS_PUZZLE_CLEAR_HIDDEN_TILE_COORDS
});

export const resetEngine = () => ({
  type: BOSS_PUZZLE_RESET_ENGINE
});
