import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { createNewStore } from 'js/store';
import { startGame, endGame } from 'js/actions/game';
import { EightQueens } from 'js/containers';

const render = () => (
  <Provider store={store}>
    <EightQueens />
  </Provider>
);

const store = createNewStore();

storiesOf('engines/EightQueens', module)
  .add('default', () => {
    store.dispatch(endGame());
    store.dispatch(startGame('eight-queens'));
    return render();
  });