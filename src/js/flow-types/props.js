// @flow
import * as React from 'react';
import type { T_GridBoardState, T_Coords } from 'js/flow-types';

export type T_GridMap = {
  [number]:{
    isOccupied:boolean,
    isSelected:boolean,
    position: T_Coords
  }
};

export type T_GridElementProps = {
  col:number,
  row:number,
  index:number,
  position?: T_Coords,
  size:number,
  isDraggable?:boolean,
  isSelected?:boolean,
  Element:React.ComponentType<{ col:number, row:number, index:number }>,
  callback:{
    onDragStop?:Function
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
  gridMap?:T_GridMap,
  element:{
    size:number,
    isDraggable?:boolean,
    isSelectable?:boolean,
    Element:React.ComponentType<{ col:number, row:number, index:number }>
  },
  callback:{
    onDragStop?:Function,
    onMoveTry?:Function,
    onMoveDone?:Function
  }
};