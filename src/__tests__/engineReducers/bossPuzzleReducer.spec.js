import bossPuzzleReducer from 'js/engines/BossPuzzle/bossPuzzle.reducer';
import { initFrame, switchTiles, clearHiddenTileCoords, resetFrame } from 'js/engines/BossPuzzle/bossPuzzle.actions';


describe('bossPuzzleReducer', () => {
  
  it('should return the initial state', () => {
    expect(bossPuzzleReducer(undefined, {})).toEqual({
      imgNumbers: [],
      imgIndex: undefined,
      tiles: [],
      hiddenTileCoords: {}
    });
  });

  // it('should handle INIT_FRAME', () => {
  //   expect(bossPuzzleReducer({
  //     imgNumbers: [],
  //     imgIndex: undefined,
  //     tiles: [],
  //     hiddenTileCoords: {}
  //   }, initFrame().toEqual({});
  // });
});