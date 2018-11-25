// @flow
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { Row, Col } from 'react-flexbox-grid';
import { Paper } from 'material-ui';
import { isEmpty, isEqual, findKey } from 'lodash';

import { coordsToIndex, offsetToIndex } from 'js/extracts/gridBoard';
import { initGridBoard, updateGridBoard, grabElement, selectElement, resetGridBoard } from 'js/actions/gridBoard';

import type { T_GridBoardProps, T_Event, T_Coords } from 'js/flow-types';
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

  componentWillMount() {
    const { dispatch, element: { isSelectable, isDraggable }, gridMap } = this.props;
    if (gridMap) { dispatch(initGridBoard(gridMap, isSelectable, isDraggable)); }
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

    const { gridBoard, dimension, gridMap, element } = this.props;

    if (!dimension || !element.size || (gridMap && isEmpty(gridBoard.gridMap))) { return null; }

    return (
      <Paper
        className='GridBoard'
        style={{ minWidth: dimension * element.size + 'px' }}
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
                    onClick={this.onBoardCellClick.bind(this, index)}
                  >
                    {(isEmpty(gridBoard.gridMap) || gridBoard.gridMap[index].isOccupied) && (
                      !element.isDraggable && (
                        <div style={{ cursor: element.isSelectable ? 'pointer': 'default' }}>
                          {element.Element && <element.Element
                            col={col}
                            row={row}
                            index={index}
                            isSelected={element.isSelectable && !isEmpty(gridBoard.gridMap) && gridBoard.gridMap[index].isSelected}
                          />}
                        </div>
                      ) ||
                      element.isDraggable && (
                        <Draggable
                          position={{ x: 0, y: 0 }}
                          onStart={() => this.props.dispatch(grabElement(index))}
                          onStop={this.onElementDragStop({ col, row, index, size: element.size })}
                        >
                          <div>
                            <div style={{ pointerEvents: 'none' }}>
                              {element.Element && <element.Element col={col} row={row} index={index} />}
                            </div>
                          </div>
                        </Draggable>
                      )
                    )}
                  </div>
                </Col>
              );
            })}
          </Row>
        ))}
      </Paper>
    );
  }

  onBoardCellClick(clickedIndex:number) {
    const { dispatch, gridBoard: { gridMap }, element: { isSelectable }, callback: { onEmptyCellClick } } = this.props;
    if (gridMap && !isEmpty(gridMap)) {
      // Empty cell
      if (!gridMap[clickedIndex].isOccupied) {
        if (!isSelectable) {
          onEmptyCellClick && onEmptyCellClick(clickedIndex);
        } else {
          const activeIndex = Number(findKey(gridMap, { isSelected: true }));
          if (activeIndex > -1) {
            onEmptyCellClick && onEmptyCellClick(clickedIndex, activeIndex);
          }
        }
        
      // Occupied cell
      } else {
        if (isSelectable) { dispatch(selectElement(clickedIndex)); }
      }
    }
  }

  onElementDragStop(elementProps: { col:number, row:number, index:number, size:number }) {
    return (e:T_Event, coords:T_Coords) => {
      const { gridBoard: { gridMap }, dimension, callback: { onElementMove } } = this.props;
      if (onElementMove) {
        const { col, row, index, size } = elementProps;
        const newIndex = offsetToIndex({
          x: coords.x + col * size,
          y: coords.y + row * size
        }, size, dimension);

        if (newIndex > -1 && newIndex !== index && !gridMap[newIndex].isOccupied) {
          onElementMove(index, newIndex);
        }
      }
    }
  }

  getElementContainerStyle(col:number, row:number, index:number ) {
  
    const squareBgColors = ['#dbbe92', '#52220b'];
    const { gridBoard: { gridMap, grabbedIndex }, isChessBoard, element, callback } = this.props;

    const style = {
      minWidth: `${element.size}px`,
      height: `${element.size}px`,
      cursor: 'default',
      backgroundColor: undefined,
      position: undefined,
      zIndex: undefined
    };

    if (isChessBoard) {
      style.backgroundColor = squareBgColors[(col + row) % 2];
    }

    if (element.isDraggable && gridMap && gridMap[index].isOccupied) {
      style.position = 'relative';
      style.zIndex = index === grabbedIndex ? 100: 99;
      style.cursor = 'pointer';
    }
    
    if (callback.onEmptyCellClick) {
      style.cursor = 'pointer';
    }

    return style;
  }
}

export default connect(store => ({ gridBoard: store.gridBoard }))(GridBoard);