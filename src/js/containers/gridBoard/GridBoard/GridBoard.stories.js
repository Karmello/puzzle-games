import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { createNewStore } from 'js/store';
import { GridBoard } from 'js/containers';

import knightImg from '~/imgs/KnightsTour/knight.jpg';
import queenImg from '~/imgs/EightQueens/queen.png';

const render = props => (
  <Provider store={store}>
    <GridBoard { ...props } />
  </Provider>
);

const store = createNewStore();

storiesOf('gridBoard/GridBoard', module)
  .add('an empty chessboard', () => {
    return render({
      dimension: 8,
      isChessBoard: true,
      element: {
        size: 80
      }
    });
  })
  .add('chessboard with one static element', () => {
    const gridMap = Array.from({ length: 64 }, () => false);
    gridMap[0] = true;
    return render({
      dimension: 8,
      isChessBoard: true,
      gridMap,
      element: {
        size: 80,
        Element: () => (
          <img
            src={knightImg}
            width='80px'
            height='80px'
          />
        )
      }
    });
  })
  .add('chessboard with selectable elements', () => {
    const gridMap = Array.from({ length: 64 }, () => false);
    gridMap[0] = true;
    gridMap[22] = true;
    gridMap[34] = true;
    gridMap[48] = true;
    return render({
      dimension: 8,
      isChessBoard: true,
      gridMap,
      element: {
        size: 80,
        isSelectable: true,
        Element: ({ isSelected }) => (
          <img
            src={queenImg}
            width='80px'
            height='80px'
            style={{ backgroundColor: isSelected ? 'yellow': 'white' }}
          />
        )
      }
    });
  })
  .add('chessboard with draggable elements', () => {
    const gridMap = Array.from({ length: 64 }, () => false);
    gridMap[5] = true;
    gridMap[18] = true;
    gridMap[33] = true;
    gridMap[55] = true;
    return render({
      dimension: 8,
      isChessBoard: true,
      gridMap,
      element: {
        size: 80,
        isDraggable: true,
        Element: () => (
          <img
            src={queenImg}
            width='80px'
            height='80px'
            style={{ backgroundColor: 'white' }}
          />
        )
      }
    });
  });