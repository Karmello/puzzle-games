export const initFrame = (dimension, tiles, hiddenTileCoords) => {
  return {
    type: 'INIT_FRAME',
    payload: {
      dimension: dimension,
      tiles: tiles,
      hiddenTileCoords: hiddenTileCoords
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

export const resetFrame = () => {
  return {
    type: 'RESET_FRAME'
  }
}