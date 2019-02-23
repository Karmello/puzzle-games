import tetrisReducer from 'js/reducers/tetris';
import { initEngine, updateEngine, resetEngine } from 'js/actions/tetris';


describe('tetrisReducer', () => {

  it('should return the initial state', () => {
    expect(tetrisReducer(undefined, {})).toEqual({
      blocks: []
    });
  });

  it('should handle TETRIS_INIT_ENGINE', () => {
    expect(tetrisReducer({ blocks: [] }, initEngine([true, false, true, false, false]))).toEqual({
      blocks: [true, false, true, false, false]
    });
  });

  it('should handle TETRIS_UPDATE_ENGINE', () => {
    expect(tetrisReducer({
      blocks: [true, false, true, false, false]
    }, updateEngine([false, true, false, true, true]))).toEqual({
      blocks: [false, true, false, true, true]
    });
  });

  it('should handle TETRIS_RESET_ENGINE', () => {
    expect(tetrisReducer({
      blocks: [false, true, false, true, true]
    }, resetEngine())).toEqual({
      blocks: []
    });
  });
});