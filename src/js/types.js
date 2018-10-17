// @flow
import * as React from 'react';

// flow types
export type T_Coords = {
   x?:number,
   y?:number
};

export type T_Event = {
  target:{
    value:number
  },
  currentTarget:React.Node
};

export type T_RouterProps = {
  match:{ params:{ id:string, category:string, gameId:string }},
  location:{ pathname:string, search:string }
};