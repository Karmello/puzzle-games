// @flow

export type Action = {
  type:string,
  meta: {
    [key:string]:any
  },
  payload:{
    [key:string]:any
  }
};

export type GameOptions = {
  mode?:string,
  dimension?:string
};

export type GameStore = {
  id:string,
  options:GameOptions,
  moves:number,
  isSolved:boolean,
  isLoading:boolean,
  doRestart:boolean
};

export type GamePageStore = {
  infoExpanded:boolean,
  bestScoreExpanded:boolean
};

export type GamesPageStore = {
  category:string,
  options:GameOptions
};

export type HighscoresPageStore = {
  gameFilter:{ id?:string, category?:string },
  optionsFilter:GameOptions
};