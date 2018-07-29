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

export type ApiStore = {
  clientUser:any,
  bestHighscore:any
};

export type AppStore = {
  NODE_ENV:string|null|typeof undefined,
  title:string,
  authStatus:string,
  showDrawer:boolean,
  isLoading:boolean
};

export type GameStore = {
  id?:string,
  options:{},
  moves:number,
  isSolved:boolean,
  isLoading:boolean,
  doRestart:boolean
};

export type BossPuzzleEngine = {
  imgNumbers:Array<number>,
  imgIndex:number|typeof undefined,
  tiles:Array<number>,
  hiddenTileCoords:{
    x?:number,
    y?:number
  }
};

export type EightQueensEngine = {
  queens:Array<boolean>
};

export type SudokuEngine = {
  values:Array<number>
};