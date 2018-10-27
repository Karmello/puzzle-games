// @flow
import * as React from 'react';
import { Component } from 'react';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import { GridElement } from 'js/components';
import { coordsToIndex, indexToCoords, offsetToIndex, findAllMovementCoords, isAloneOnAxis } from 'js/extracts/gridBoard';
import type { T_Event, T_Coords } from 'js/flow-types';
import './GridBoard.css';

type Props = {
  dimension:number,
  squareSize:number,
  Square:React.ComponentType<{ col:number, row:number, index:number }>,
  isDraggable?:boolean,
  isChessBoard?:boolean,
  gridData?:Array<boolean>,
  onDragMade?:Function,
  onEmptyCellClick?:Function
};

type State = {
  lastDraggedIndex:number|null
};

export default class GridBoard extends Component<Props, State> {

  getStyles:(subject:string, args?:{ col?:number, row?:number, index?:number }) => {}|null;

  static coordsToIndex = coordsToIndex;
  static indexToCoords = indexToCoords;
  static offsetToIndex = offsetToIndex;
  static findAllMovementCoords = findAllMovementCoords;
  static isAloneOnAxis = isAloneOnAxis;

  state = { lastDraggedIndex: null };

  render() {

    const { dimension, squareSize, isDraggable, Square, gridData, onDragMade } = this.props;

    if (!dimension || !squareSize) { return null; }

    return (
      <Paper className='GridBoard' style={this.getStyles('board')}>{
        Array.from({ length: dimension }, (v, k) => k).map(i => (
          <Row key={i} style={this.getStyles('row')}>{
            Array.from({ length: dimension }, (v, k) => k).map(j => {
              
              const row = Number(i);
              const col = Number(j);
              const index = GridBoard.coordsToIndex({ x: col, y: row }, dimension);
              
              return (
                <Col key={j}>
                  <div
                    style={this.getStyles('squareContainer', { col, row })}
                    onClick={this.onBoardClick.bind(this, index)}
                  >
                    <GridElement
                      col={col}
                      row={row}
                      index={index}
                      dimension={dimension}
                      squareSize={squareSize}
                      Content={Square}
                      isDraggable={isDraggable}
                      gridData={gridData}
                      onDragMade={onDragMade}
                    />
                  </div>
                </Col>
              );
            })
          }</Row>
        ))
      }</Paper>
    );
  }

  onBoardClick(index:number) {
    const { onEmptyCellClick, gridData } = this.props;
    if (onEmptyCellClick && gridData && !gridData[index]) { onEmptyCellClick(index); }
  }

  getStyles(subject:string, args:{ col:number, row:number, index:number }) {
  
    const squareBgColors = ['#dbbe92', '#52220b'];
    const { dimension, squareSize, isChessBoard, onEmptyCellClick } = this.props;

    switch (subject) {

      case 'board':
        return { minWidth: dimension * squareSize + 'px', cursor: onEmptyCellClick ? 'pointer' : 'default' }

      case 'row':
        return { padding: 0, margin: 0 }

      case 'squareContainer':
        const style = {
          minWidth: `${squareSize}px`,
          height: `${squareSize}px`,
          backgroundColor: undefined
        };
        if (isChessBoard) {
          style.backgroundColor = squareBgColors[(args.col + args.row) % 2];
        }
        return style;

      case 'draggableContent':
        return {
          position: 'relative',
          zIndex: args.index === this.state.lastDraggedIndex ? 100: 99
        }

      default:
        return null;
    }
  }

  onDragStart = (index:number) => () => this.setState({ lastDraggedIndex: index });

  onDragStop = (index:number, col:number, row:number, position:T_Coords) => (e:T_Event, data:T_Coords) => {

    const { dimension, squareSize, gridData, onDragMade } = this.props;

    const index = GridBoard.offsetToIndex({
      x: data.x + col * squareSize,
      y: data.y + row * squareSize
    }, squareSize, dimension);

    if (index > -1 && gridData && !gridData[index]) {
      const newCoords = GridBoard.indexToCoords(index, dimension);
      position.x = newCoords.x * squareSize - col * squareSize;
      position.y = newCoords.y * squareSize - row * squareSize;
      if (onDragMade) {
        setTimeout(() => onDragMade(this.state.lastDraggedIndex, index));
      }
    }
  };
}