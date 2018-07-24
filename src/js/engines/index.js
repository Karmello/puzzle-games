import { combineReducers } from 'redux';

import bossPuzzleReducer from './BossPuzzle/bossPuzzleReducer';
import eightQueensReducer from './EightQueens/eightQueensReducer';
import sudokuReducer from './Sudoku/sudokuReducer';


export const engineReducers = combineReducers({
  'boss-puzzle': bossPuzzleReducer,
  'eight-queens': eightQueensReducer,
  'sudoku': sudokuReducer
});

export { default as BossPuzzle } from './BossPuzzle/BossPuzzle';
export { default as SquareTile } from './BossPuzzle/SquareTile/SquareTile';
export { default as EightQueens } from './EightQueens/EightQueens';
export { default as Sudoku } from './Sudoku/Sudoku';