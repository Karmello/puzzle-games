import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import store from 'js/store';
import { startGame } from 'js/actions/game';
import { BossPuzzle } from 'js/containers';

// store.dispatch(startGame('BossPuzzle', { mode: 'NUM', dimension: '3' }));

storiesOf('engines/BossPuzzle', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => (
    <BossPuzzle
      restarting={false}
      readTimer={action('readTimer')}
    ></BossPuzzle>
  ));