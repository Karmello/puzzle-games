import bossPuzzleReducer from 'js/reducers/bossPuzzle';
import { initEngine, switchTiles, clearHiddenTileCoords, resetEngine } from 'js/actions/bossPuzzle';


xdescribe('bossPuzzleReducer', () => {
  
  it('should return the initial state', () => {
    expect(bossPuzzleReducer(undefined, {})).toEqual({
      imgNumbers: [],
      imgIndex: -1,
      tiles: [],
      hiddenTileCoords: { x: -1, y: -1 }
    });
  });

  it('should handle INIT_FRAME', () => {
    expect(bossPuzzleReducer({
      imgNumbers: [],
      imgIndex: -1,
      tiles: [],
      hiddenTileCoords: { x: -1, y: -1 }
    }, initEngine([1, 2, 3, 4, 5], 0, [4, 3, 6, 2, 7, 1, 8, 9, 5], { x: 0, y: 0 }))).toEqual({
      imgNumbers: [1, 2, 3, 4, 5],
      imgIndex: 0,
      tiles: [4, 3, 6, 2, 7, 1, 8, 9, 5],
      hiddenTileCoords: { x: 0, y: 0 }
    });
  });

  it('should handle SWITCH_TILES', () => {
    expect(bossPuzzleReducer({
      imgNumbers: [1, 2, 3, 4, 5],
      imgIndex: 0,
      tiles: [4, 3, 6, 2, 7, 1, 8, 9, 5],
      hiddenTileCoords: { x: 0, y: 0 }
    }, switchTiles(0, 1, { x: 0, y: 1 }))).toEqual({
      imgNumbers: [1, 2, 3, 4, 5],
      imgIndex: 0,
      tiles: [3, 4, 6, 2, 7, 1, 8, 9, 5],
      hiddenTileCoords: { x: 0, y: 1 }
    });
  });

  it('should handle CLEAR_HIDDEN_TILE_COORDS', () => {
    expect(bossPuzzleReducer({
      imgNumbers: [1, 2, 3, 4, 5],
      imgIndex: 0,
      tiles: [4, 3, 6, 2, 7, 1, 8, 9, 5],
      hiddenTileCoords: { x: 0, y: 0 }
    }, clearHiddenTileCoords())).toEqual({
      imgNumbers: [1, 2, 3, 4, 5],
      imgIndex: 0,
      tiles: [4, 3, 6, 2, 7, 1, 8, 9, 5],
      hiddenTileCoords: { x: -1, y: -1 }
    });
  });

  it('should handle RESET_FRAME', () => {
    expect(bossPuzzleReducer({
      imgNumbers: [1, 2, 3, 4, 5],
      imgIndex: 0,
      tiles: [4, 3, 6, 2, 7, 1, 8, 9, 5],
      hiddenTileCoords: { x: 0, y: 0 }
    }, resetEngine())).toEqual({
      imgNumbers: [],
      imgIndex: -1,
      tiles: [],
      hiddenTileCoords: { x: -1, y: -1 }
    });
  });
});