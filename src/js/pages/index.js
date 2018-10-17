import { combineReducers } from 'redux';

import gamesPageReducer from './GamesPage/gamesPageReducer';
import gamePageReducer from './GamePage/gamePageReducer';
import highscoresPageReducer from './HighscoresPage/highscoresPageReducer';

import type { T_GameOptionsModel } from 'js/api';

// reducer
export const pageReducers = combineReducers({
  gamesPage: gamesPageReducer,
  gamePage: gamePageReducer,
  highscoresPage: highscoresPageReducer
});

// components
export { default as AuthPage } from './AuthPage/AuthPage';
export { default as RootPage } from './RootPage/RootPage';
export { default as GamesPage } from './GamesPage/GamesPage';
export { default as GamePage } from './GamePage/GamePage';
export { default as HighscoresPage } from './HighscoresPage/HighscoresPage';

// flow types

export type T_GamesPageSettings = {
  category:string,
  options:T_GameOptionsModel
};

export type T_GamePageSettings = {
  infoExpanded:boolean,
  bestScoreExpanded:boolean
};

export type T_HighscoresPageSettings = {
  gameFilter:{ id?:string, category?:string },
  optionsFilter:T_GameOptionsModel
};

export type T_PagesSettings = {
  gamesPage:T_GamesPageSettings,
  gamePage:T_GamePageSettings,
  highscoresPage:T_HighscoresPageSettings
};