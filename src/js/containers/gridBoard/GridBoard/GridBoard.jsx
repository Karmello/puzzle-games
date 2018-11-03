// @flow
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import { isEmpty, isEqual, findKey } from 'lodash';

import { GridElement } from 'js/components';
import { coordsToIndex } from 'js/extracts/gridBoard';
import { initGridBoard, updateGridBoard, grabElement, selectElement, resetGridBoard } from 'js/actions/gridBoard';

import type { T_GridBoardProps } from 'js/flow-types';
import './GridBoard.css';

class GridBoard extends Component<T_GridBoardProps> {

  static defaultProps = {
    isChessBoard: false,
    element: {
      isDraggable: false,
      isSelectable: false,
    },
    callback: {}
  };

  getElementContainerStyle:(col?:number, row?:number, index?:number) => {};

  onElementClick = (index:number) => () => {
    const { dispatch, element: { isSelectable } } = this.props;
    dispatch(grabElement(index));
    if (isSelectable) { dispatch(selectElement(index)); }
  };

  componentWillMount() {
    const { dispatch, element: { isSelectable }, gridMap } = this.props;
    if (gridMap) { dispatch(initGridBoard(gridMap, isSelectable)); }
  }

  componentWillReceiveProps(nextProps:T_GridBoardProps) {
    const { element: { isSelectable }, gridMap } = this.props;
    if (nextProps.gridMap && !isEqual(gridMap, nextProps.gridMap)) {
      this.props.dispatch(updateGridBoard(nextProps.gridMap, isSelectable));
    }
  }
  
  componentWillUnmount() {
    this.props.dispatch(resetGridBoard());
  }

  render() {

    const { gridBoard: { gridMap }, dimension, element, callback } = this.props;

    if (isEmpty(gridMap) || !dimension || !element.size) { return null; }

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
                      isSelected={element.isSelectable && gridMap[index].isSelected}
                      Element={element.Element}
                      board={{ dimension, data: gridMap }}
                      callback={{
                        onClick: this.onElementClick.bind(this),
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
    const { gridBoard: { gridMap }, callback: { onMoveTry, onMoveDone } } = this.props;
    if (onMoveTry && gridMap && !gridMap[index].isOccupied) {
      const selectedIndex = findKey(gridMap, { isSelected: true });
      if (onMoveTry(selectedIndex, index)) {
        if (onMoveDone) { onMoveDone(selectedIndex, index); }
      }
    }
  }

  onDragStop(index:number) {
    const { gridBoard, callback: { onDragStop } } = this.props;
    if (onDragStop) {
      return onDragStop(gridBoard.grabbedIndex, index);
    }
  }

  getElementContainerStyle(col:number, row:number, index:number ) {
  
    const squareBgColors = ['#dbbe92', '#52220b'];
    const { gridBoard: { gridMap, grabbedIndex }, isChessBoard, element } = this.props;

    const style = {
      minWidth: `${element.size}px`,
      height: `${element.size}px`,
      backgroundColor: undefined,
      position: undefined,
      zIndex: undefined
    };

    if (element.isDraggable && gridMap && gridMap[index].isOccupied) {
      style.position = 'relative';
      style.zIndex = index === grabbedIndex ? 100: 99;
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