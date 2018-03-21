import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import Draggable from 'react-draggable';

import { coordsToIndex, indexToCoords, offsetToIndex, findAllMovementCoords, isAloneOnAxis } from 'js/game/GridGameBoard/GridGameBoard.logic';
import './GridGameBoard.css';


class GridGameBoard extends Component {

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
                    {gridData[index] &&
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

  onDragStart(e, data, index) {
    this.setState({ lastDraggedIndex: index });
  }

  onDragStop(e, data, col, row, position) {

    const { dimension, squareSize, gridData, onDragMade } = this.props;

    const index = GridGameBoard.offsetToIndex({
      x: data.x + col * squareSize,
      y: data.y + row * squareSize
    }, squareSize, dimension);


    if (index > -1 && !gridData[index]) {
      const newCoords = GridGameBoard.indexToCoords(index, dimension);
      position.x = newCoords.x * squareSize - col * squareSize;
      position.y = newCoords.y * squareSize - row * squareSize;
      setTimeout(() => onDragMade(this.state.lastDraggedIndex, index));
    }
  }

  getStyles(subject, args) {
  
    const squareBgColors = ['#dbbe92', '#52220b'];
    const { dimension, squareSize } = this.props;

    switch (subject) {

      case 'board':
        return { minWidth: dimension * squareSize + 'px' }

      case 'row':
        return { padding: 0, margin: 0 }

      case 'col':
        return { padding: 0 }

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

GridGameBoard.propTypes = {
  dimension: PropTypes.number.isRequired,
  squareSize: PropTypes.number.isRequired,
  Square: PropTypes.func.isRequired,
  draggable: PropTypes.bool,
  gridData: PropTypes.array,
  onDragMade: PropTypes.func
};

export default GridGameBoard;