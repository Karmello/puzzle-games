import { combineReducers } from 'redux';

import bossPuzzleReducer from './BossPuzzle/bossPuzzleReducer';
import eightQueensReducer from './EightQueens/eightQueensReducer';
import sudokuReducer from './Sudoku/sudokuReducer';


export const engineReducers = combineReducers({
  'boss-puzzle': bossPuzzleReducer,
  'eight-queens': eightQueensReducer,
  'sudoku': sudokuReducer
});