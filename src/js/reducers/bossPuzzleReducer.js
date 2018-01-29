import { INIT_FRAME, SWITCH_TILES, CLEAR_HIDDEN_TILE_COORDS, RESET_FRAME } from 'js/actions/bossPuzzle';

const initialState = {
  imgNumbers: [],
  imgIndex: undefined,
  tiles: [],
  hiddenTileCoords: {},
  moves: 0
};

const bossPuzzleReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case INIT_FRAME:
      return {
        ...state,
        imgNumbers: action.payload.imgNumbers,
        imgIndex: action.payload.imgIndex,
        tiles: action.payload.tiles,
        hiddenTileCoords: action.payload.hiddenTileCoords,
        moves: 0
      }

    case SWITCH_TILES:

      const newState = {
        ...state,
        hiddenTileCoords: action.payload.hiddenTileCoords,
        moves: state.moves + 1
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
      return {
        imgNumbers: [],
        imgIndex: undefined,
        tiles: [],
        hiddenTileCoords: {},
        moves: 0
      }

    default:
      return state;
  }
}

export default bossPuzzleReducer;