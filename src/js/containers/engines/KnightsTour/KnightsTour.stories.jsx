import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { createNewStore } from 'js/store';
import { startGame, endGame } from 'js/actions/game';
import { KnightsTour } from 'js/containers';

const render = () => (
  <Provider store={store}>
    <KnightsTour />
  </Provider>
);

const store = createNewStore();

storiesOf('engines/KnightsTour', module)
  .add('5x5', () => {
    store.dispatch(endGame());
    store.dispatch(startGame('knights-tour', { dimension: '5' }));
    return render();
  })
  .add('8x8', () => {
    store.dispatch(endGame());
    store.dispatch(startGame('knights-tour', { dimension: '8' }));
    return render();
  });