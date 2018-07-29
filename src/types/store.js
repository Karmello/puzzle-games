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

export type ApiState = {
  clientUser:any,
  bestHighscore:any
};

export type AppState = {
  NODE_ENV:string|null|typeof undefined,
  title:string,
  authStatus:string,
  showDrawer:boolean,
  isLoading:boolean
};

export type GameState = {
  id?:string,
  options:{},
  moves:number,
  isSolved:boolean,
  isLoading:boolean,
  doRestart:boolean
};

export type BossPuzzleState = {
  imgNumbers:Array<number>,
  imgIndex:number|typeof undefined,
  tiles:Array<number>,
  hiddenTileCoords:{
    x?:number,
    y?:number
  }
};