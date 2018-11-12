import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { createNewStore } from 'js/store';
import { startGame, endGame } from 'js/actions/game';
import { BossPuzzle } from 'js/containers';

const render = () => (
  <Provider store={store}>
    <BossPuzzle />
  </Provider>
);

const store = createNewStore();

storiesOf('engines/BossPuzzle', module)
  .add('NUM 3x3', () => {
    store.dispatch(endGame());
    store.dispatch(startGame('BossPuzzle', { mode: 'NUM', dimension: '3' }));
    return render();
  })
  .add('NUM 4x4', () => {
    store.dispatch(endGame());
    store.dispatch(startGame('BossPuzzle', { mode: 'NUM', dimension: '4' }));
    return render();
  })
  .add('NUM 5x5', () => {
    store.dispatch(endGame());
    store.dispatch(startGame('BossPuzzle', { mode: 'NUM', dimension: '5' }));
    return render();
  })
  .add('IMG 3x3', () => {
    store.dispatch(endGame());
    store.dispatch(startGame('BossPuzzle', { mode: 'IMG', dimension: '3' }));
    return render();
  })
  .add('IMG 4x4', () => {
    store.dispatch(endGame());
    store.dispatch(startGame('BossPuzzle', { mode: 'IMG', dimension: '4' }));
    return render();
  })
  .add('IMG 5x5', () => {
    store.dispatch(endGame());
    store.dispatch(startGame('BossPuzzle', { mode: 'IMG', dimension: '5' }));
    return render();
  });