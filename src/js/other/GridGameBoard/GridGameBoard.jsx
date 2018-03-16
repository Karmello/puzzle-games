import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';


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
  })
};

const GridGameBoard = props => {
  const { dimension, squareSize, squareMargin, square } = props;
  return (
    <Paper style={styles.board(dimension, squareSize, squareMargin)}>{
      Array.from({ length: dimension }, (v, k) => k).map(i => (
        <Row key={i} style={styles.row}>{
          Array.from({ length: dimension }, (v, k) => k).map(j => (
            <Col key={j} style={styles.col(squareMargin)}>{square}</Col>
          ))
        }</Row>
      ))
    }</Paper>
  );
};

GridGameBoard.propTypes = {
  dimension: PropTypes.number.isRequired,
  squareSize: PropTypes.number.isRequired,
  squareMargin: PropTypes.number,
  square: PropTypes.element.isRequired
};

export default GridGameBoard;