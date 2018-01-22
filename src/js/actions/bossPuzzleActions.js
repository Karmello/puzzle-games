export const initFrame = (dimension, tiles, hiddenTileCoords, imgNumbers, imgIndex) => {
  return {
    type: 'INIT_FRAME',
    payload: {
      dimension: dimension,
      tiles: tiles,
      hiddenTileCoords: hiddenTileCoords,
      imgNumbers: imgNumbers,
      imgIndex: imgIndex
    }
  }
}

export const setDimension = (dimension) => {
  return {
    type: 'SET_DIMENSION',
    payload: {
      dimension: dimension
    }
  }
}

export const switchTiles = (index1, index2, hiddenTileCoords) => {
  return {
    type: 'SWITCH_TILES',
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
    type: 'CLEAR_HIDDEN_TILE_COORDS'
  }
}

export const resetFrame = () => {
  return {
    type: 'RESET_FRAME'
  }
}