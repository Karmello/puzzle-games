import { combineReducers } from 'redux';

import gamesPageReducer from './GamesPage/gamesPage.reducer';
import highscoresPageReducer from './HighscoresPage/highscoresPage.reducer';


export const pageReducers = combineReducers({
  gamesPage: gamesPageReducer,
  highscoresPage: highscoresPageReducer
});

export { default as AuthPage } from './AuthPage/AuthPage';
export { default as GamesPage } from './GamesPage/GamesPage';
export { default as GamePage } from './GamePage/GamePage';
export { default as HighscoresPage } from './HighscoresPage/HighscoresPage';