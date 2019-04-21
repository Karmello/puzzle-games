// @flow
import type { T_GridMap, T_GameOptionsModel } from 'js/flow-types';

export type T_AppState = {
  NODE_ENV:string|null|typeof undefined,
  title:string,
  authStatus:string,
  showDrawer:boolean,
  isLoading:boolean
};

export type T_GamesPageState = {
  category:string,
  options:{
    'boss-puzzle':T_GameOptionsModel,
    'knights-tour':T_GameOptionsModel
  }
};

export type T_GamePageState = {
  infoExpanded:boolean,
  bestScoreExpanded:boolean
};

export type T_HighscoresPageState = {
  gameFilter:{ id?:string, category?:string },
  optionsFilter:T_GameOptionsModel
};

export type T_PagesState = {
  gamesPage:T_GamesPageState,
  gamePage:T_GamePageState,
  highscoresPage:T_HighscoresPageState
};

export type T_GameState = {
  id:string,
  options:T_GameOptionsModel,
  moves:number,
  isSolved:boolean,
  isLoading:boolean,
  doRestart:boolean
};

export type T_GridBoardState = {
  gridMap:T_GridMap,
  grabbedIndex:number
};
