import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import Draggable from 'react-draggable';

import { Game } from 'js/game';


const squareBgColors = ['#dbbe92', '#52220b'];

const styles = {
  board: (dimension, squareSize, squareMargin = 0) => ({
    'minWidth': dimension * (squareSize + 2 * squareMargin) + 'px'
  }),
  row: {
    padding: 0,
    margin: 0
  },
  col: (squareMargin = 0) => ({
    padding: `${squareMargin}px`
  }),
  draggableContainer: (squareSize, col, row) => ({
    minWidth: `${squareSize}px`,
    height: `${squareSize}px`,
    backgroundColor: squareBgColors[(col + row) % 2]
  })
};

const GridGameBoard = props => {
  
  const { dimension, squareSize, squareMargin, draggable, Square, gridData } = props;

  const onDragStart = (e, data, config) => {
    //config.zIndex += 1;
  }

  const onDragStop = (e, data, config) => {
    
    //config.zIndex -= 1;

    const index = Game.offsetToIndex({
      x: data.x + config.col * squareSize,
      y: data.y + config.row * squareSize
    }, squareSize, dimension);

    if (index > -1 && !gridData[index]) {
      const newCoords = Game.indexToCoords(index, dimension);
      config.position.x = newCoords.x * squareSize - config.col * squareSize;
      config.position.y = newCoords.y * squareSize - config.row * squareSize;
    }
  }

  return (
    <Paper style={styles.board(dimension, squareSize, squareMargin)}>{
      Array.from({ length: dimension }, (v, k) => k).map(i => (
        <Row key={i} style={styles.row}>{
          Array.from({ length: dimension }, (v, k) => k).map(j => {
            
            const config = {
              col: Number(i),
              row: Number(j),
              position: { x: 0, y: 0 }
            };
            
            return (
              <Col key={j} style={styles.col(squareMargin)}>
                {draggable &&
                <div style={styles.draggableContainer(squareSize, config.col, config.row)}>
                  {gridData[Game.coordsToIndex({ x: config.col, y: config.row }, dimension)] &&
                  <Draggable
                    position={config.position}
                    onStart={(e, data) => onDragStart(e, data, config)}
                    onStop={(e, data) => onDragStop(e, data, config)}
                  >
                    <div>
                      <Square col={config.col} row={config.row} />
                    </div>
                  </Draggable>}
                </div>}
                {!draggable && <Square col={config.col} row={config.row} />}
              </Col>
            );
          })
        }</Row>
      ))
    }</Paper>
  );
};

GridGameBoard.propTypes = {
  dimension: PropTypes.number.isRequired,
  squareSize: PropTypes.number.isRequired,
  squareMargin: PropTypes.number,
  draggable: PropTypes.bool,
  Square: PropTypes.func.isRequired
};

export default GridGameBoard;