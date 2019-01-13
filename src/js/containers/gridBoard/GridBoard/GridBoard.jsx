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
import { C_GridBoard } from 'js/constants';

import type { T_GridBoardProps, T_Event, T_Coords } from 'js/flow-types';
import './GridBoard.css';

type State = {
  actualElementSize:number
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

  constructor(props) {
    super(props);
    this.state = { actualElementSize: this.getActualElementSize() };
    this.onWindowResize = this.onWindowResize.bind(this);
  }
  
  componentWillMount() {
    const { dispatch, element: { isSelectable, isDraggable }, gridMap } = this.props;
    if (gridMap) { dispatch(initGridBoard(gridMap, isSelectable, isDraggable)); }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillReceiveProps(nextProps:T_GridBoardProps) {
    const { element: { isSelectable }, gridMap } = this.props;
    if (nextProps.gridMap && !isEqual(gridMap, nextProps.gridMap)) {
      this.props.dispatch(updateGridBoard(nextProps.gridMap, isSelectable));
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    this.props.dispatch(resetGridBoard());
  }

  render() {

    const { actualElementSize } = this.state;
    const { gridBoard, dimension, gridMap, element } = this.props;

    if (!dimension || !element.size || (gridMap && isEmpty(gridBoard.gridMap))) { return null; }

    return (
      <Paper
        className='GridBoard'
        style={{ minWidth: dimension * actualElementSize + 'px' }}
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
                            isSelected={this.isElementSelected(index)}
                            style={this.getElementStyle({ col, row, index, size: actualElementSize })}
                          />}
                        </div>
                      ) ||
                      element.isDraggable && (
                        <Draggable
                          position={{ x: 0, y: 0 }}
                          onStart={() => this.props.dispatch(grabElement(index))}
                          onStop={this.onElementDragStop({ col, row, index, size: actualElementSize })}
                        >
                          <div>
                            <div style={{ pointerEvents: 'none' }}>
                              {element.Element && <element.Element
                                col={col}
                                row={row}
                                index={index}
                                style={this.getElementStyle({ col, row, index, size: actualElementSize })}
                              />}
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

  onWindowResize = () => this.setState({ actualElementSize: this.getActualElementSize() });

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

  onElementDragStop(elementProps: { col:number, row:number, index:number }) {
    return (e:T_Event, coords:T_Coords) => {
      const { actualElementSize } = this.state;
      const { gridBoard: { gridMap }, dimension, callback: { onElementMove } } = this.props;
      if (onElementMove) {
        const { col, row, index } = elementProps;
        const newIndex = offsetToIndex({
          x: coords.x + col * actualElementSize,
          y: coords.y + row * actualElementSize
        }, actualElementSize, dimension);

        if (newIndex > -1 && newIndex !== index && !gridMap[newIndex].isOccupied) {
          onElementMove(index, newIndex);
        }
      }
    }
  }

  getElementContainerStyle(col:number, row:number, index:number ) {
  
    const squareBgColors = ['#dbbe92', '#52220b'];
    const { actualElementSize } = this.state;
    const { gridBoard: { gridMap, grabbedIndex }, isChessBoard, element, callback } = this.props;

    const style = {
      minWidth: `${actualElementSize}px`,
      height: `${actualElementSize}px`,
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

  getElementStyle({ col, row, index, size }) {
    const { getStyle } = this.props.element;
    return getStyle ? getStyle({ col, row, index, isSelected: this.isElementSelected(index), size }) : undefined;
  }

  isElementSelected(index:number) {
    const { element, gridBoard } = this.props;
    return element.isSelectable && !isEmpty(gridBoard.gridMap) && gridBoard.gridMap[index].isSelected;
  }

  getActualElementSize() {
    const { minGridBoardElemSize, offset } = C_GridBoard;
    const { dimension, element: { size } } = this.props;
    if (dimension * size > window.innerWidth - offset) {
      const newSize = Math.floor((window.innerWidth - offset) / dimension);
      return newSize >= minGridBoardElemSize ? newSize : minGridBoardElemSize;
    }
    return size;
  }
}

export default connect(store => ({ gridBoard: store.gridBoard }))(GridBoard);