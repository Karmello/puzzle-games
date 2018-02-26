import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FbBtn } from './../src/js/other';


storiesOf('FbBtn', module).add('authStatus = "unknown"', () => (
  <FbBtn authStatus='unknown' onClick={action('onClick')}></FbBtn>
));

storiesOf('FbBtn', module).add('authStatus = "not_authorized"', () => (
  <FbBtn authStatus='not_authorized' onClick={action('onClick')}></FbBtn>
));

storiesOf('FbBtn', module).add('authStatus = "connected"', () => (
  <FbBtn authStatus='connected' onClick={action('onClick')}></FbBtn>
));