import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { createNewStore } from 'js/store';
import { GridBoard } from 'js/containers';

import knightImg from '~/imgs/KnightsTour/knight.jpg';

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
  .add('chessboard with one immovable element', () => {
    return render({
      dimension: 8,
      isChessBoard: true,
      gridMap: Array.from({ length: 64 }, (v, k) => ({ isOccupied: k === 0 ? true : false })),
      element: {
        size: 80,
        Element: () => <img src={knightImg} width='80px' height='80px' />
      }
    });
  });