// @flow
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import { GridElement } from 'js/components';
import { coordsToIndex } from 'js/extracts/gridBoard';

import type { T_GridBoardProps } from 'js/flow-types';
import './GridBoard.css';

type State = {
  lastClickedIndex:number
};

class GridBoard extends Component<T_GridBoardProps, State> {

  static defaultProps = {
    isChessBoard: false,
    element: {
      isDraggable: false,
      isSelectable: false,
    },
    callback: {}
  };

  getElementContainerStyle:(col?:number, row?:number, index?:number) => {};

  state = { lastClickedIndex: -1 };
  onClick = (index:number) => () => this.setState({ lastClickedIndex: index });

  render() {

    const { dimension, elementsMap, element, callback } = this.props;
    const { lastClickedIndex } = this.state;

    if (!dimension || !element.size) { return null; }

    return (
      <Paper
        className='GridBoard'
        style={{ minWidth: dimension * element.size + 'px', cursor: callback.onMoveTry ? 'pointer' : 'default' }}
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
                      isSelected={element.isSelectable && index === lastClickedIndex}
                      Element={element.Element}
                      board={{ dimension, data: elementsMap }}
                      callback={{
                        onClick: this.onClick.bind(this),
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
    const { elementsMap, callback: { onMoveTry, onMoveDone } } = this.props;
    if (onMoveTry && elementsMap && !elementsMap[index]) {
      if (onMoveTry(this.state.lastClickedIndex, index)) {
        if (onMoveDone) { onMoveDone(this.state.lastClickedIndex, index); }
        this.setState({ lastClickedIndex: index });
      }
    }
  }

  onDragStop(index:number) {
    const { onDragStop } = this.props.callback;
    const { lastClickedIndex } = this.state;
    if (onDragStop) {
      return onDragStop(lastClickedIndex, index);
    }
  }

  getElementContainerStyle(col:number, row:number, index:number ) {
  
    const squareBgColors = ['#dbbe92', '#52220b'];
    const { isChessBoard, elementsMap, element } = this.props;

    const style = {
      minWidth: `${element.size}px`,
      height: `${element.size}px`,
      backgroundColor: undefined,
      position: undefined,
      zIndex: undefined
    };

    if (element.isDraggable && elementsMap && elementsMap[index]) {
      style.position = 'relative';
      style.zIndex = index === this.state.lastClickedIndex ? 100: 99;
    }

    if (isChessBoard) {
      style.backgroundColor = squareBgColors[(col + row) % 2];
    }
    
    return style;
  }
}

export default connect(store => ({
  gridBoard: store.gridBoard
}))(GridBoard);