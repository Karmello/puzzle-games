import { combineReducers } from 'redux';

import gamesPageReducer from './GamesPage/gamesPage.reducer';
import gamePageReducer from './GamePage/gamePage.reducer';
import highscoresFilterReducer from './HighscoresPage/HighscoresFilter/highscoresFilter.reducer';
import highscoresTableReducer from './HighscoresPage/HighscoresTable/highscoresTable.reducer';


export { default as AuthPage } from './AuthPage/AuthPage';
export { default as GamesPage } from './GamesPage/GamesPage';
export { default as GamePage } from './GamePage/GamePage';
export { default as HighscoresPage } from './HighscoresPage/HighscoresPage';

export const pageReducers = combineReducers({
  gamesPage: gamesPageReducer,
  gamePage: gamePageReducer,
  highscoresPage: combineReducers({
    filter: highscoresFilterReducer,
    table: highscoresTableReducer
  })
});