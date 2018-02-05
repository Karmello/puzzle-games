import { combineReducers } from 'redux';

import gamesPageReducer from './GamesPage/gamesPage.reducer';
import gamePageReducer from './GamePage/gamePage.reducer';
import resultsPageReducer from './ResultsPage/resultsPage.reducer';


export { default as AuthPage } from './AuthPage/AuthPage';
export { default as GamesPage } from './GamesPage/GamesPage';
export { default as GamePage } from './GamePage/GamePage';
export { default as ResultsPage } from './ResultsPage/ResultsPage';

export const pageReducers = combineReducers({
  gamesPage: gamesPageReducer,
  gamePage: gamePageReducer,
  resultsPage: resultsPageReducer
})