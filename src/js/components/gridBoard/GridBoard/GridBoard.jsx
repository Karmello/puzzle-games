// @flow
import * as React from 'react';
import { Component } from 'react';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import { GridElement } from 'js/components';
import { coordsToIndex } from 'js/extracts/gridBoard';
import './GridBoard.css';

type Props = {
  dimension:number,
  elementSize:number,
  Element:React.ComponentType<{ col:number, row:number, index:number }>,
  isDraggable?:boolean,
  isChessBoard?:boolean,
  gridData?:Array<boolean>,
  onDragStop?:Function,
  onEmptyCellClick?:Function
};

type State = {
  lastDraggedIndex:number|null
};

export default class GridBoard extends Component<Props, State> {

  getElementContainerStyle:(col?:number, row?:number, index?:number) => {};

  state = { lastDraggedIndex: null };

  render() {

    const { dimension, elementSize, Element, isDraggable, gridData, onEmptyCellClick } = this.props;
    
    if (!dimension || !elementSize) { return null; }

    return (
      <Paper
        className='GridBoard'
        style={{ minWidth: dimension * elementSize + 'px', cursor: onEmptyCellClick ? 'pointer' : 'default' }}
      >
        {Array.from({ length: dimension }, (v, k) => k).map(i => (
          <Row
            key={i}
            style={{ padding: 0, margin: 0 }}
          >
            {Array.from({ length: dimension }, (v, k) => k).map(j => {
              
              const row = Number(i);
              const col = Number(j);
              const index = coordsToIndex({ x: col, y: row }, dimension);
              
              return (
                <Col key={j}>
                  <div
                    style={this.getElementContainerStyle(col, row, index)}
                    onClick={this.onBoardClick.bind(this, index)}
                  >
                    <GridElement
                      col={col}
                      row={row}
                      index={index}
                      dimension={dimension}
                      elementSize={elementSize}
                      Element={Element}
                      isDraggable={isDraggable}
                      gridData={gridData}
                      onDragStart={this.onDragStart.bind(this)}
                      onDragStop={this.onDragStop.bind(this)}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        ))}
      </Paper>
    );
  }

  onBoardClick(index:number) {
    const { onEmptyCellClick, gridData } = this.props;
    if (onEmptyCellClick && gridData && !gridData[index]) { onEmptyCellClick(index); }
  }

  onDragStop(index:number) {
    const { onDragStop } = this.props;
    const { lastDraggedIndex } = this.state;
    if (onDragStop) {
      return onDragStop(lastDraggedIndex, index);
    }
  }

  getElementContainerStyle(col:number, row:number, index:number ) {
  
    const squareBgColors = ['#dbbe92', '#52220b'];
    const { elementSize, isDraggable, isChessBoard, gridData } = this.props;

    const style = {
      minWidth: `${elementSize}px`,
      height: `${elementSize}px`,
      backgroundColor: undefined,
      position: undefined,
      zIndex: undefined
    };

    if (isDraggable && gridData && gridData[index]) {
      style.position = 'relative';
      style.zIndex = index === this.state.lastDraggedIndex ? 100: 99;
    }

    if (isChessBoard) {
      style.backgroundColor = squareBgColors[(col + row) % 2];
    }
    
    return style;
  }

  onDragStart = (index:number) => () => this.setState({ lastDraggedIndex: index });
}