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

export type PageRouteLogicProps = {
  match:{ params:{ id:string, category:string, gameId:string }},
  location:{ pathname:string, search:string }
};