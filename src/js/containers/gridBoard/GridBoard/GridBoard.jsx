// @flow
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { Row, Col } from 'react-flexbox-grid';
import { Paper } from 'material-ui';
import { isEmpty, isEqual, findKey } from 'lodash';

import { coordsToIndex, indexToCoords, offsetToIndex } from 'js/extracts/gridBoard';
import { initGridBoard, updateGridBoard, grabElement, selectElement, changeElementPosition, resetGridBoard } from 'js/actions/gridBoard';

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
                    onClick={this.onBoardCellClick.bind(this, index)}
                  >
                    {(isEmpty(gridMap) || gridMap[index].isOccupied) && (
                      !element.isDraggable && (
                        <div style={{ cursor: 'default' }}>
                          {element.Element && <element.Element
                            col={col}
                            row={row}
                            index={index}
                            isSelected={element.isSelectable && !isEmpty(gridMap) && gridMap[index].isSelected}
                          />}
                        </div>
                      ) ||
                      element.isDraggable && (
                        <Draggable
                          position={element.isDraggable ? gridMap[index].position : undefined}
                          onStop={this.onElementDragStop.bind(this)}
                        >
                          <div>
                            {element.Element && <element.Element col={col} row={row} index={index} />}
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
    const { dispatch, gridBoard: { gridMap }, element: { isSelectable, isDraggable }, callback: { onEmptyCellClick } } = this.props;
    if (gridMap && !isEmpty(gridMap)) {
      // Empty cell
      if (!gridMap[clickedIndex].isOccupied) {
        if (!isSelectable) {
          onEmptyCellClick && onEmptyCellClick(clickedIndex);
        } else {
          const activeIndex = findKey(gridMap, { isSelected: true });
          if (activeIndex > -1) {
            onEmptyCellClick && onEmptyCellClick(clickedIndex, activeIndex);
          }
        }
        
      // Occupied cell
      } else {
        if (isDraggable) { dispatch(grabElement(clickedIndex)); }
        if (isSelectable) { dispatch(selectElement(clickedIndex)); }
      }
    }
  }

  onElementDragStop(elementProps: { col:number, row:number, size:number }) {
    return (e:T_Event, coords:T_Coords) => {

      const { dispatch, gridBoard: { gridMap }, dimension } = this.props;
      const { col, row, size } = elementProps;

      const newIndex = offsetToIndex({
        x: coords.x + col * size,
        y: coords.y + row * size
      }, size, dimension);

      if (newIndex > -1 && gridMap && !gridMap[newIndex].isOccupied) {
        const newCoords = indexToCoords(newIndex, dimension);
        dispatch(changeElementPosition(newIndex, {
          x: Number(newCoords.x) * size - col * size,
          y: Number(newCoords.y) * size - row * size
        }));
      }
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

export default connect(store => ({ gridBoard: store.gridBoard }))(GridBoard);