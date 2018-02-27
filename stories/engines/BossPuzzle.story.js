import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import store from 'js/store';
import { startGame } from 'js/pages/GamePage/gamePage.actions';
import { BossPuzzle } from 'js/engines';


store.dispatch(startGame('BossPuzzle', { mode: 'NUM', dimension: '3' }));

storiesOf('engines/BossPuzzle', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => (
    <BossPuzzle
      onFinishInit={action('onFinishInit')}
      onMakeMove={action('onMakeMove')}
      onBeenSolved={action('onBeenSolved')}
      restarting={false}
    ></BossPuzzle>
  ));