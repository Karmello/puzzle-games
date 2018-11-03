// @flow
import * as React from 'react';
import Draggable from 'react-draggable';

import { indexToCoords, offsetToIndex } from 'js/extracts/gridBoard';
import type { T_Event, T_Coords, T_GridElementProps } from 'js/flow-types';

type State = {
  position:T_Coords
};

const onDragStop = (props:T_GridElementProps, state:State) => (e:T_Event, coords:T_Coords) => {

  const { col, row, size, board: { dimension, data }, callback: { onDragStop } } = props;
  const { position } = state;

  const index = offsetToIndex({
    x: coords.x + col * size,
    y: coords.y + row * size
  }, size, dimension);

  if (index > -1 && data && !data[index].isOccupied) {
    const newCoords = indexToCoords(index, dimension);
    position.x = newCoords.x * size - col * size;
    position.y = newCoords.y * size - row * size;
    if (onDragStop) {
      setTimeout(() => onDragStop(index));
    }
  }
};

export default (props:T_GridElementProps) => {
  
  const state = {
    position: { x: 0, y: 0 }
  }

  const { col, row, index, Element, board: { data } } = props;

  return (
    <div>
      {data && data[index].isOccupied &&
      <Draggable
        position={state.position}
        onStop={onDragStop(props, state)}
      >
        <div>
          <Element col={col} row={row} index={index} />
        </div>
      </Draggable>}
    </div>
  );
};