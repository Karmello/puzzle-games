import { combineReducers } from 'redux';

import gamesPageReducer from './GamesPage/gamesPageReducer';
import gamePageReducer from './GamePage/gamePageReducer';
import highscoresPageReducer from './HighscoresPage/highscoresPageReducer';


export const pageReducers = combineReducers({
  gamesPage: gamesPageReducer,
  gamePage: gamePageReducer,
  highscoresPage: highscoresPageReducer
});

export { default as AuthPage } from './AuthPage/AuthPage';
export { default as RootPage } from './RootPage/RootPage';
export { default as GamesPage } from './GamesPage/GamesPage';
export { default as GamePage } from './GamePage/GamePage';
export { default as HighscoresPage } from './HighscoresPage/HighscoresPage';