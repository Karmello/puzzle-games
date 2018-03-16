import { combineReducers } from 'redux';

import bossPuzzleReducer from './BossPuzzle/bossPuzzle.reducer';
import eightQueensReducer from './EightQueens/eightQueens.reducer';


export const engineReducers = combineReducers({
  BossPuzzle: bossPuzzleReducer,
  EightQueens: eightQueensReducer
});

export { default as GameEngine } from './GameEngine/GameEngine';
export { default as BossPuzzle } from './BossPuzzle/BossPuzzle';
export { default as SquareTile } from './BossPuzzle/SquareTile/SquareTile';
export { default as EightQueens } from './EightQueens/EightQueens';