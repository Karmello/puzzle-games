// @flow

import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import Draggable from 'react-draggable';

import { coordsToIndex, indexToCoords, offsetToIndex, findAllMovementCoords, isAloneOnAxis } from './gridGameBoardHelpers';
import './GridGameBoard.css';

import type { T_Event, T_Coords } from 'js/types';

type Props = {
  dimension:number,
  draggable?:boolean,
  Square:any,
  gridData?:Array<boolean>,
  squareSize:number,
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

    const { dimension, draggable, Square, gridData } = this.props;

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
                <Col key={j} style={this.getStyles('col')}>
                  {draggable &&
                  <div style={this.getStyles('draggableContainer', { col, row })}>
                    {gridData && gridData[index] &&
                    <Draggable
                      position={position}
                      onStart={(e, data) => this.onDragStart(e, data, index)}
                      onStop={(e, data) => this.onDragStop(e, data, col, row, position)}
                    >
                      <div style={this.getStyles('draggableChild', { index })}>
                        <Square col={col} row={row} />
                      </div>
                    </Draggable>}
                  </div>}
                  {!draggable && <Square col={col} row={row} />}
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
    const { dimension, squareSize } = this.props;

    switch (subject) {

      case 'board':
        return { minWidth: dimension * squareSize + 'px' }

      case 'row':
        return { padding: 0, margin: 0 }

      case 'col':
        return { padding: 0, display: 'table' }

      case 'draggableContainer':
        return {
          minWidth: `${squareSize}px`,
          height: `${squareSize}px`,
          backgroundColor: squareBgColors[(args.col + args.row) % 2]
        }

      case 'draggableChild':
        return {
          position: 'relative',
          zIndex: args.index === this.state.lastDraggedIndex ? 100: 99
        }

      default:
        return null;
    }
  }
}