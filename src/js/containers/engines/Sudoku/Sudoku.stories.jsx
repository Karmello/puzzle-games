import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { createNewStore } from 'js/store';
import { startGame, endGame } from 'js/actions/game';
import { Sudoku } from 'js/containers';

const render = () => (
  <Provider store={store}>
    <Sudoku />
  </Provider>
);

const store = createNewStore();

storiesOf('engines/Sudoku', module)
  .add('default', () => {
    store.dispatch(endGame());
    store.dispatch(startGame('sudoku'));
    return render();
  });
