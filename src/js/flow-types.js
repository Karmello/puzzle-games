// @flow
import * as React from 'react';

// app
export type T_AppSettings = {
  NODE_ENV:string|null|typeof undefined,
  title:string,
  authStatus:string,
  showDrawer:boolean,
  isLoading:boolean
};

// api
export type T_ApiRequest = {
  isAwaiting?:boolean,
  headers?:{},
  params?:{},
  query?:{},
  body?:{}
};

export type T_ApiResponse = {
  config:{
    method:string,
    url:string
  },
  status:number,
  statusText:string,
  data:any
};

export type T_ApiError = {
  config:{
    method:string,
    url:string
  },
  response:{
    status:number,
    statusText:string,
    data:any
  }
};

export type T_ApiEndPoint = {
  req:T_ApiRequest,
  res:T_ApiResponse
};

export type T_ApiEntities = {
  clientUser:T_ApiEndPoint,
  games:T_ApiEndPoint,
  gameCategories:T_ApiEndPoint,
  highscores:T_ApiEndPoint,
  bestHighscore:T_ApiEndPoint,
  newHighscore:T_ApiEndPoint
};

export type T_UserModel = {
  username:string,
  password:string
};

export type T_GameModel = {
  id:string,
  categoryId:string,
  name:string,
  description:string
};

export type T_GameOptionsModel = {
  mode?:string,
  dimension?:string
};

export type T_HighscoreModel = {
  username:string,
  gameId:string,
  options:T_GameOptionsModel,
  details:{ moves:number, seconds:number }
};

// pages
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

// game
export type T_GameSettings = {
  id:string,
  options:T_GameOptionsModel,
  moves:number,
  isSolved:boolean,
  isLoading:boolean,
  doRestart:boolean
};

// grid board
export type T_GridElementProps = {
  col:number,
  row:number,
  index:number,
  size:number,
  isDraggable?:boolean,
  Element:React.ComponentType<{ col:number, row:number, index:number }>,
  board:{
    dimension:number,
    data?:Array<boolean>
  },
  callback:{
    onDragStart:Function,
    onDragStop?:Function
  }
};

// engines
export type T_BossPuzzleEngine = {
  imgNumbers:Array<number>,
  imgIndex:number|typeof undefined,
  tiles:Array<number>,
  hiddenTileCoords:T_Coords
};

export type T_EightQueensEngine = {
  queens:Array<boolean>
};

export type T_KnightsTourEngine = {
  visited:Array<boolean>,
  active:number
};

export type T_SudokuEngine = {
  values:Array<number>
};

// redux
export type T_Action = {
  type:string,
  meta: {
    [key:string]:any
  },
  payload:{
    [key:string]:any
  }
};

// other
export type T_Coords = {
   x?:number,
   y?:number
};

export type T_Event = {
  target:{
    value:any
  },
  currentTarget:React.Node
};

export type T_RouterProps = {
  match:{ params:{ id:string, category:string, gameId:string }},
  location:{ pathname:string, search:string }
};

export type T_TimerRef = { state:{ seconds:number } };