import React from 'react';
import Draggable from 'react-draggable';
import { Button } from 'material-ui';

import { Game } from 'js/game';
import { EightQueens } from 'js/engines';


const queenImgUrl = `${process.env.REACT_APP_S3_BUCKET}/EightQueens/queen.png`;
const colors = ['#dbbe92', '#52220b', 'greenyellow'];

const isEmpty = (props, index) => !props.engine.queens[index];

const getStyle = {
  square: props => ({
    minWidth: `${EightQueensSquare.size}px`,
    height: `${EightQueensSquare.size}px`,
    backgroundColor: colors[(props.col + props.row) % 2]
  }),
  queen: () => ({
    minWidth: `${EightQueensSquare.size}px`,
    height: `${EightQueensSquare.size}px`,
    borderRadius: '50px',
    backgroundImage: `url(${queenImgUrl})`,
    backgroundSize: `${EightQueensSquare.size}px ${EightQueensSquare.size}px`,
    zIndex: 100
  })
};


const EightQueensSquare = props => {

  const index = Game.coordsToIndex({ x: props.col, y: props.row }, EightQueens.dimension);
  const queenStyle = getStyle.queen();
  const position = { x: 0, y: 0 };

  const onDragStart = () => {
    queenStyle.zIndex += 1;
  }

  const onDragStop = (e, data) => {
    queenStyle.zIndex -= 1;

    const index = Game.offsetToIndex({
      x: data.x + props.col * EightQueensSquare.size,
      y: data.y + props.row * EightQueensSquare.size
    }, EightQueensSquare.size, EightQueens.dimension);

    if (index > -1 && isEmpty(props, index)) {
      const newCoords = Game.indexToCoords(index, EightQueens.dimension);
      position.x = newCoords.x * EightQueensSquare.size - props.col * EightQueensSquare.size;
      position.y = newCoords.y * EightQueensSquare.size - props.row * EightQueensSquare.size;
    }
  }
  
  return (
    <div style={getStyle.square(props)}>
      {!isEmpty(props, index) && <Draggable 
        onStart={onDragStart}
        onStop={onDragStop}
        position={position}
      >
        <Button style={queenStyle}> </Button>
      </Draggable>}
    </div>
  );
};

EightQueensSquare.size = 75;

export default EightQueensSquare;