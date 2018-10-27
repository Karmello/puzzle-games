// @flow
import * as React from 'react';
import Draggable from 'react-draggable';

import { indexToCoords, offsetToIndex } from 'js/extracts/gridBoard';
import type { T_Event, T_Coords } from 'js/flow-types';

type Props = {
  col:number,
  row:number,
  index:number,
  dimension:number,
  squareSize:number,
  Content:React.ComponentType<{ col:number, row:number, index:number }>,
  isDraggable?:boolean,
  gridData?:Array<boolean>,
  onDragMade?:Function
};

type State = {
  lastDraggedIndex:number,
  position:T_Coords
};

const onDragStart = (state:State, index:number) => () => state.lastDraggedIndex = index;

const onDragStop = (props:Props, state:State) => (e:T_Event, data:T_Coords) => {

  const { col, row, dimension, squareSize, gridData, onDragMade } = props;
  const { position, lastDraggedIndex } = state;

  const index = offsetToIndex({
    x: data.x + col * squareSize,
    y: data.y + row * squareSize
  }, squareSize, dimension);

  if (index > -1 && gridData && !gridData[index]) {
    const newCoords = indexToCoords(index, dimension);
    position.x = newCoords.x * squareSize - col * squareSize;
    position.y = newCoords.y * squareSize - row * squareSize;
    if (onDragMade) {
      setTimeout(() => onDragMade(lastDraggedIndex, index));
    }
  }
};

export default (props:Props) => {
  
  const state = {
    lastDraggedIndex: -1,
    position: { x: 0, y: 0 }
  }

  const { col, row, index, Content, isDraggable, gridData } = props;

  return (
    <div>
      {isDraggable && gridData && gridData[index] &&
      <Draggable
        position={state.position}
        onStart={onDragStart(state, index)}
        onStop={onDragStop(props, state)}
      >
        <div style={{ position: 'relative', zIndex: index === state.lastDraggedIndex ? 100: 99 }}>
          <Content col={col} row={row} index={index} />
        </div>
      </Draggable>}
      {!isDraggable &&
      <div style={{ cursor: 'default' }}>
        {((gridData && gridData[index]) || !gridData) && <Content col={col} row={row} index={index} />}
      </div>}
    </div>
  );
};