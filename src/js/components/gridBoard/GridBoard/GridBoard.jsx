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
  isChessBoard?:boolean,
  data?:Array<boolean>,
  element:{
    size:number,
    isDraggable?:boolean,
    Element:React.ComponentType<{ col:number, row:number, index:number }>
  },
  callback:{
    onDragStop?:Function,
    onEmptyCellClick?:Function
  }
};

type State = {
  lastDraggedIndex:number|null
};

export default class GridBoard extends Component<Props, State> {

  static defaultProps = {
    isChessBoard: false,
    element: { isDraggable: false },
    callback: {}
  };

  getElementContainerStyle:(col?:number, row?:number, index?:number) => {};

  state = { lastDraggedIndex: null };

  render() {

    const { dimension, data, element, callback } = this.props;
    
    if (!dimension || !element.size) { return null; }

    return (
      <Paper
        className='GridBoard'
        style={{ minWidth: dimension * element.size + 'px', cursor: callback.onEmptyCellClick ? 'pointer' : 'default' }}
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
                      size={element.size}
                      isDraggable={element.isDraggable}
                      Element={element.Element}
                      board={{ dimension, data }}
                      callback={{
                        onDragStart: this.onDragStart.bind(this),
                        onDragStop: this.onDragStop.bind(this)
                      }}
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
    const { data, callback: { onEmptyCellClick } } = this.props;
    if (onEmptyCellClick && data && !data[index]) { onEmptyCellClick(index); }
  }

  onDragStop(index:number) {
    const { onDragStop } = this.props.callback;
    const { lastDraggedIndex } = this.state;
    if (onDragStop) {
      return onDragStop(lastDraggedIndex, index);
    }
  }

  getElementContainerStyle(col:number, row:number, index:number ) {
  
    const squareBgColors = ['#dbbe92', '#52220b'];
    const { isChessBoard, data, element } = this.props;

    const style = {
      minWidth: `${element.size}px`,
      height: `${element.size}px`,
      backgroundColor: undefined,
      position: undefined,
      zIndex: undefined
    };

    if (element.isDraggable && data && data[index]) {
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