import React from 'react';
import { Button } from 'material-ui';

import { Game } from 'js/game';
import { EightQueens } from 'js/engines';


const EightQueensSquare = props => {

  const queenImgUrl = `${process.env.REACT_APP_S3_BUCKET}/EightQueens/queen.png`;
  const colors = ['#dbbe92', '#52220b', 'greenyellow'];

  const index = Game.coordsToIndex({ x: props.col, y: props.row }, EightQueens.dimension);
  const isEmpty = () => !props.engine.queens[index];

  const styles = {
    btn: (col, row) => {
      
      const style = {
        borderRadius: 0,
        minWidth: `${EightQueensSquare.size}px`,
        height: `${EightQueensSquare.size}px`
      };
      
      style.backgroundColor = colors[(col + row) % 2];
      
      if (!isEmpty()) {
        style.backgroundImage = `url(${queenImgUrl})`;
        style.backgroundSize = `${EightQueensSquare.size}px ${EightQueensSquare.size}px`;
      }
      
      return style;
    }
  };

  return (
    <Button
      disabled={isEmpty()}
      style={styles.btn(props.col, props.row)}
    > </Button>
  );
};

EightQueensSquare.size = 75;

export default EightQueensSquare;