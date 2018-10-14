// @flow

export type GameDashBoardRef = {
  timerRef:{
    state:{}
  }
};

export type Coords = {
   x:number|typeof undefined,
   y:number|typeof undefined
};

export type Event = {
  target:{
    value:number
  },
  currentTarget:{}
};