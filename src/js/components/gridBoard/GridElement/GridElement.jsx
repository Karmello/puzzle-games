// @flow
import * as React from 'react';
import { DraggableGridElement } from 'js/components';

type Props = {
  col:number,
  row:number,
  index:number,
  dimension:number,
  Element:React.ComponentType<{ col:number, row:number, index:number }>,
  elementSize:number,
  isDraggable?:boolean,
  gridData?:Array<boolean>,
  onDragStart:Function,
  onDragStop?:Function
};

export default (props:Props) => {

  const { col, row, index, dimension, Element, elementSize, isDraggable, gridData, onDragStart, onDragStop } = props;

  if (!isDraggable) {
    return (
      <div style={{ cursor: 'default' }}>
        {((gridData && gridData[index]) || !gridData) && <Element col={col} row={row} index={index} />}
      </div>
    );

  } else {
    return (
      <DraggableGridElement
        col={col}
        row={row}
        index={index}
        dimension={dimension}
        elementSize={elementSize}
        Element={Element}
        gridData={gridData}
        onDragStart={onDragStart}
        onDragStop={onDragStop}
      />
    );
  }
};