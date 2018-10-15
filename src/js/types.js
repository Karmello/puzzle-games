// @flow

// flow types
export type T_Coords = {
   x:number|typeof undefined,
   y:number|typeof undefined
};

export type T_Event = {
  target:{
    value:number
  },
  currentTarget:{}
};

export type T_PageRouteLogicProps = {
  match:{ params:{ id:string, category:string, gameId:string }},
  location:{ pathname:string, search:string }
};