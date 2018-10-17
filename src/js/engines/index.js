// @flow
import { combineReducers } from 'redux';
import type { T_Coords } from 'js/types';

import bossPuzzleReducer from './BossPuzzle/bossPuzzleReducer';
import eightQueensReducer from './EightQueens/eightQueensReducer';
import sudokuReducer from './Sudoku/sudokuReducer';

// reducer
export const engineReducers = combineReducers({
  'boss-puzzle': bossPuzzleReducer,
  'eight-queens': eightQueensReducer,
  'sudoku': sudokuReducer
});

// components
export { default as BossPuzzle } from './BossPuzzle/BossPuzzle';
export { default as SquareTile } from './BossPuzzle/SquareTile/SquareTile';
export { default as EightQueens } from './EightQueens/EightQueens';
export { default as Sudoku } from './Sudoku/Sudoku';

// flow types
export type T_BossPuzzleEngine = {
  imgNumbers:Array<number>,
  imgIndex:number|typeof undefined,
  tiles:Array<number>,
  hiddenTileCoords:T_Coords
};

export type T_EightQueensEngine = {
  queens:Array<boolean>
};

export type T_SudokuEngine = {
  values:Array<number>
};