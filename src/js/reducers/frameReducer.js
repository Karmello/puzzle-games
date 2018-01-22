const initialState = {
  dimension: 3,
  tiles: [],
  hiddenTileCoords: {}
};

const frameReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'INIT_FRAME':
      return {
        ...state,
        dimension: action.payload.dimension,
        tiles: action.payload.tiles,
        hiddenTileCoords: action.payload.hiddenTileCoords
      }

    case 'SET_DIMENSION':
      return {
        ...state,
        dimension: action.payload.dimension
      }

    case 'SWITCH_TILES':

      const newState = {
        ...state,
        hiddenTileCoords: action.payload.hiddenTileCoords
      };

      const temp = newState.tiles[action.meta.index1];
      newState.tiles[action.meta.index1] = newState.tiles[action.meta.index2];
      newState.tiles[action.meta.index2] = temp;
      return newState;

    case 'RESET_FRAME':
      return {
        ...state,
        tiles: [],
        hiddenTileCoords: {}
      }

    default:
      return state;
  }
}

export default frameReducer;