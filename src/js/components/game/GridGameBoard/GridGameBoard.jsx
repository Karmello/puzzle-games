// @flow
import * as React from 'react';
import { Component } from 'react';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import Draggable from 'react-draggable';

import { coordsToIndex, indexToCoords, offsetToIndex, findAllMovementCoords, isAloneOnAxis } from 'js/extracts/gridGameBoard';
import type { T_Event, T_Coords } from 'js/flow-types';
import './GridGameBoard.css';

type Props = {
  dimension:number,
  squareSize:number,
  Square:Function,
  isDraggable?:boolean,
  isChessBoard?:boolean,
  gridData?:Array<boolean>,
  onDragMade?:Function
};

type State = {
  lastDraggedIndex:number|null
};

export default class GridGameBoard extends Component<Props, State> {

  getStyles:(subject:string, args?:{ col?:number, row?:number, index?:number }) => {}|null;

  static coordsToIndex = coordsToIndex;
  static indexToCoords = indexToCoords;
  static offsetToIndex = offsetToIndex;
  static findAllMovementCoords = findAllMovementCoords;
  static isAloneOnAxis = isAloneOnAxis;

  state = { lastDraggedIndex: null };

  render() {

    const { dimension, squareSize, isDraggable, Square, gridData } = this.props;

    if (!dimension || !squareSize) { return null; }

    return (
      <Paper className='GridGameBoard' style={this.getStyles('board')}>{
        Array.from({ length: dimension }, (v, k) => k).map(i => (
          <Row key={i} style={this.getStyles('row')}>{
            Array.from({ length: dimension }, (v, k) => k).map(j => {
              
              const row = Number(i);
              const col = Number(j);
              const index = GridGameBoard.coordsToIndex({ x: col, y: row }, dimension);
              const position = { x: 0, y: 0 };
              
              return (
                <Col key={j}>
                  <div style={this.getStyles('squareContainer', { col, row })}>
                    {isDraggable && gridData && gridData[index] &&
                    <Draggable
                      position={position}
                      onStart={(e, data) => this.onDragStart(e, data, index)}
                      onStop={(e, data) => this.onDragStop(e, data, col, row, position)}
                    >
                      <div style={this.getStyles('draggableContent', { index })}>
                        <Square col={col} row={row} />
                      </div>
                    </Draggable>}
                    {!isDraggable && gridData && gridData[index] && <Square col={col} row={row} />}
                    {!isDraggable && !gridData && <Square col={col} row={row} />}
                  </div>
                </Col>
              );
            })
          }</Row>
        ))
      }</Paper>
    );
  }

  onDragStart(e:T_Event, data:T_Coords, index:number) {
    this.setState({ lastDraggedIndex: index });
  }

  onDragStop(e:T_Event, data:T_Coords, col:number, row:number, position:T_Coords) {

    const { dimension, squareSize, gridData, onDragMade } = this.props;

    const index = GridGameBoard.offsetToIndex({
      x: data.x + col * squareSize,
      y: data.y + row * squareSize
    }, squareSize, dimension);


    if (index > -1 && gridData && !gridData[index]) {
      const newCoords = GridGameBoard.indexToCoords(index, dimension);
      position.x = newCoords.x * squareSize - col * squareSize;
      position.y = newCoords.y * squareSize - row * squareSize;
      if (onDragMade) {
        setTimeout(() => onDragMade(this.state.lastDraggedIndex, index));
      }
    }
  }

  getStyles(subject:string, args:{ col:number, row:number, index:number }) {
  
    const squareBgColors = ['#dbbe92', '#52220b'];
    const { dimension, squareSize, isChessBoard } = this.props;

    switch (subject) {

      case 'board':
        return { minWidth: dimension * squareSize + 'px' }

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
}