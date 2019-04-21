import sudokuReducer from 'js/reducers/sudoku';
import { initEngine, changeValue, resetEngine } from 'js/actions/sudoku';


describe('knightsTourReducer', () => {

  it('should return the initial state', () => {
    expect(sudokuReducer(undefined, {})).toEqual({
      values: []
    });
  });

  it('should handle SUDOKU_INIT_ENGINE', () => {
    expect(sudokuReducer({ values: [] }, initEngine([2, 4, 7, 8, 5]))).toEqual({
      values: [2, 4, 7, 8, 5]
    });
  });

  it('should handle SUDOKU_CHANGE_VALUE', () => {
    expect(sudokuReducer({
      values: [2, 4, 7, 8, 5]
    }, changeValue(2, 10))).toEqual({
      values: [2, 4, 10, 8, 5]
    });
  });

  it('should handle SUDOKU_RESET_ENGINE', () => {
    expect(sudokuReducer({
      values: [2, 4, 10, 8, 5]
    }, resetEngine())).toEqual({
      values: []
    });
  });
});