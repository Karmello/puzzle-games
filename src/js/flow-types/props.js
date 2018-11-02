// @flow
import * as React from 'react';

export type T_GridElementProps = {
  col:number,
  row:number,
  index:number,
  size:number,
  isDraggable?:boolean,
  isSelected?:boolean,
  Element:React.ComponentType<{ col:number, row:number, index:number }>,
  board:{
    dimension:number,
    data?:Array<boolean>
  },
  callback:{
    onClick:Function,
    onDragStop?:Function
  }
};

export type T_RouterProps = {
  match:{ params:{ id:string, category:string, gameId:string }},
  location:{ pathname:string, search:string }
};

export type T_GridBoardProps = {
  dimension:number,
  isChessBoard?:boolean,
  elementsMap?:Array<boolean>,
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