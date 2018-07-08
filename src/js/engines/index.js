import { combineReducers } from 'redux';

import bossPuzzleReducer from './BossPuzzle/bossPuzzle.reducer';
import eightQueensReducer from './EightQueens/eightQueens.reducer';
import sudokuReducer from './Sudoku/sudoku.reducer';


export const engineReducers = combineReducers({
  'boss-puzzle': bossPuzzleReducer,
  'eight-queens': eightQueensReducer,
  'sudoku': sudokuReducer
});

export { default as BossPuzzle } from './BossPuzzle/BossPuzzle';
export { default as SquareTile } from './BossPuzzle/SquareTile/SquareTile';
export { default as EightQueens } from './EightQueens/EightQueens';