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
  gridData?:Array<boolean>,
  onDragStart?:Function,
  onDragMade?:Function
};

type State = {
  position:T_Coords
};

const onDragStop = (props:Props, state:State) => (e:T_Event, data:T_Coords) => {

  const { col, row, dimension, squareSize, gridData, onDragMade } = props;
  const { position } = state;

  const index = offsetToIndex({
    x: data.x + col * squareSize,
    y: data.y + row * squareSize
  }, squareSize, dimension);

  if (index > -1 && gridData && !gridData[index]) {
    const newCoords = indexToCoords(index, dimension);
    position.x = newCoords.x * squareSize - col * squareSize;
    position.y = newCoords.y * squareSize - row * squareSize;
    if (onDragMade) {
      setTimeout(() => onDragMade(index));
    }
  }
};

export default (props:Props) => {
  
  const state = {
    position: { x: 0, y: 0 }
  }

  const { col, row, index, Content, gridData, onDragStart } = props;

  return (
    <div>
      {gridData && gridData[index] &&
      <Draggable
        position={state.position}
        onStart={onDragStart ? onDragStart(index) : undefined}
        onStop={onDragStop(props, state)}
      >
        <div>
          <Content col={col} row={row} index={index} />
        </div>
      </Draggable>}
    </div>
  );
};