// @flow
import * as React from 'react';
import type { T_GridBoardState, T_Coords } from 'js/flow-types';

export type T_GridMap = {
  [number]:{
    isOccupied:boolean,
    isSelected:boolean
  }
};

export type T_RouterProps = {
  match:{ params:{ id:string, category:string, gameId:string }},
  location:{ pathname:string, search:string }
};

export type T_GridBoardProps = {
  dispatch:Function,
  gridBoard:T_GridBoardState,
  dimension:T_Coords,
  isChessBoard?:boolean,
  gridMap?:Array<boolean>,
  element:{
    size:number,
    minSize?: number,
    isDraggable?:boolean,
    isSelectable?:boolean,
    Element?:React.ComponentType<{ col:number, row:number, index:number }>,
    getStyle?:Function
  },
  callback:{
    onEmptyCellClick?:Function,
    onElementMove?:Function
  }
};