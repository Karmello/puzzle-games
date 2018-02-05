import { combineReducers } from 'redux';

import gamesPageReducer from './GamesPage/gamesPage.reducer';
import gamePageReducer from './GamePage/gamePage.reducer';
import resultsFilterReducer from './ResultsPage/ResultsFilter/resultsFilter.reducer';
import resultsTableReducer from './ResultsPage/ResultsTable/resultsTable.reducer';


export { default as AuthPage } from './AuthPage/AuthPage';
export { default as GamesPage } from './GamesPage/GamesPage';
export { default as GamePage } from './GamePage/GamePage';
export { default as ResultsPage } from './ResultsPage/ResultsPage';

export const pageReducers = combineReducers({
  gamesPage: gamesPageReducer,
  gamePage: gamePageReducer,
  resultsPage: combineReducers({
    filter: resultsFilterReducer,
    table: resultsTableReducer
  })
});