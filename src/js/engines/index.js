import { combineReducers } from 'redux';

import bossPuzzleReducer from './BossPuzzle/bossPuzzle.reducer';
import eightQueensReducer from './EightQueens/eightQueens.reducer';


export const engineReducers = combineReducers({
  BossPuzzle: bossPuzzleReducer,
  EightQueens: eightQueensReducer
});