// @flow
import * as React from 'react';
import { DraggableGridElement } from 'js/components';

import type { T_GridElementProps } from 'js/flow-types';

export default (props:T_GridElementProps) => {

  const {
    col, row, index, size, isDraggable, isSelected, Element,
    board: { dimension, data },
    callback: { onDragStop  }
  } = props;

  if (!isDraggable) {
    return (
      <div style={{ cursor: 'default' }}>
        {((data && data[index].isOccupied) || !data) &&
        <Element
          col={col}
          row={row}
          index={index}
          isSelected={isSelected}
        />}
      </div>
    );

  } else {
    return (
      <DraggableGridElement
        col={col}
        row={row}
        index={index}
        size={size}
        Element={Element}
        board={{ dimension, data }}
        callback={{ onDragStop }}
      />
    );
  }
};