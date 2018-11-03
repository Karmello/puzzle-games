// @flow
import * as React from 'react';
import Draggable from 'react-draggable';
import type { T_GridElementProps } from 'js/flow-types';

export default (props:T_GridElementProps) => {

  const { col, row, index, position, isDraggable, isSelected, Element, callback: { onDragStop  } } = props;

  if (!isDraggable) {
    return (
      <div style={{ cursor: 'default' }}>
        <Element
          col={col}
          row={row}
          index={index}
          isSelected={isSelected}
        />
      </div>
    );

  } else {
    return (
      <Draggable
        position={position}
        onStop={onDragStop && onDragStop(props)}
      >
        <div>
          <Element col={col} row={row} index={index} />
        </div>
      </Draggable>
    );
  }
};