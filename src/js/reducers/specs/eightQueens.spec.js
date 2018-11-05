import eightQueensReducer from 'js/reducers/eightQueens';
import { initEngine, moveQueen, resetEngine } from 'js/actions/eightQueens';


describe('eightQueensReducer', () => {
  
  it('should return the initial state', () => {
    expect(eightQueensReducer(undefined, {})).toEqual({ queens: [] });
  });

  it('should handle INIT_FRAME', () => {
    expect(eightQueensReducer({ queens: [] }, initEngine([true, true, false, false, true, true, false, false]))).toEqual({
      queens: [true, true, false, false, true, true, false, false]
    });
  });

  it('should handle MOVE_QUEEN', () => {
    expect(eightQueensReducer({
      queens: [true, true, false, false, true, true, false, false]
    }, moveQueen(1, 2))).toEqual({
      queens: [true, false, true, false, true, true, false, false]
    });
  });

  it('should handle RESET_FRAME', () => {
    expect(eightQueensReducer({
      queens: [true, true, false, false, true, true, false, false]
    }, resetEngine())).toEqual({ queens: [] });
  });
});