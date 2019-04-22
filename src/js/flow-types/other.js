// @flow
import * as React from 'react';

export type T_Action = {
  type:string,
  meta: {
    [key:string]:any
  },
  payload:{
    [key:string]:any
  }
};

export type T_Coords = {
   x:number,
   y:number
};

export type T_Event = {
  target:{
    value:any
  },
  currentTarget:React.Node
};

export type T_TimerRef = { state:{ seconds:number } };
