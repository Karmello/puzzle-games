const initialState = {
  dimension: 3,
  tiles: [],
  hiddenTileCoords: {},
  imgNumbers: [],
  imgIndex: undefined,
  moves: 0
};

const bossPuzzleReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'INIT_FRAME':
      return {
        ...state,
        dimension: action.payload.dimension,
        tiles: action.payload.tiles,
        hiddenTileCoords: action.payload.hiddenTileCoords,
        imgNumbers: action.payload.imgNumbers,
        imgIndex: action.payload.imgIndex,
        moves: 0
      }

    case 'SET_DIMENSION':
      return {
        ...state,
        dimension: action.payload.dimension
      }

    case 'SWITCH_TILES':

      const newState = {
        ...state,
        hiddenTileCoords: action.payload.hiddenTileCoords,
        moves: state.moves + 1
      };

      const temp = newState.tiles[action.meta.index1];
      newState.tiles[action.meta.index1] = newState.tiles[action.meta.index2];
      newState.tiles[action.meta.index2] = temp;
      return newState;

    case 'CLEAR_HIDDEN_TILE_COORDS':
      return {
        ...state,
        hiddenTileCoords: {}
      }

    case 'RESET_FRAME':
      return {
        ...state,
        tiles: [],
        hiddenTileCoords: {},
        imgNumbers: [],
        imgIndex: undefined,
        moves: 0
      }

    default:
      return state;
  }
}

export default bossPuzzleReducer;