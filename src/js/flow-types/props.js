// @flow
import * as React from 'react';
import type { T_GridBoardState, T_GameOptionsModel } from 'js/flow-types';

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
  dimension:number,
  isChessBoard?:boolean,
  gridMap?:Array<boolean>,
  element:{
    size:number,
    isDraggable?:boolean,
    isSelectable?:boolean,
    Element?:React.ComponentType<{ col:number, row:number, index:number }>
  },
  callback:{
    onEmptyCellClick?:Function,
    onElementMove?:Function
  }
};

export type T_GameOptionsProps =  {
  options:T_GameOptionsModel,
  Content:React.ComponentType<T_GameOptionsProps>,
  path?:string,
  disabled?:boolean,
  onValueChangeCb?:Function
};