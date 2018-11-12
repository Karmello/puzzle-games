import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import store from 'js/store';
import { startGame } from 'js/actions/game';
import { EightQueens } from 'js/containers';

// store.dispatch(startGame('EightQueens', {}));

storiesOf('engines/EightQueens', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => (
    <EightQueens
      restarting={false}
      readTimer={action('readTimer')}
    ></EightQueens>
  ));