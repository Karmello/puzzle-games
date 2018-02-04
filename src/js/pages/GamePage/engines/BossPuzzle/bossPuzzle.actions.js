export const INIT_FRAME = 'INIT_FRAME';
export const SWITCH_TILES = 'SWITCH_TILES';
export const CLEAR_HIDDEN_TILE_COORDS = 'CLEAR_HIDDEN_TILE_COORDS';
export const RESET_FRAME = 'RESET_FRAME';

export const initFrame = (imgNumbers, imgIndex, tiles, hiddenTileCoords) => {
  return {
    type: INIT_FRAME,
    payload: {
      imgNumbers: imgNumbers,
      imgIndex: imgIndex,
      tiles: tiles,
      hiddenTileCoords: hiddenTileCoords
    }
  }
}

export const switchTiles = (index1, index2, hiddenTileCoords) => {
  return {
    type: SWITCH_TILES,
    meta: {
      index1: index1,
      index2: index2
    },
    payload: {
      hiddenTileCoords: hiddenTileCoords
    }
  }
}

export const clearHiddenTileCoords = () => {
  return {
    type: CLEAR_HIDDEN_TILE_COORDS
  }
}

export const resetFrame = () => {
  return {
    type: RESET_FRAME
  }
}