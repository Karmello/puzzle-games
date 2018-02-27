import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FbBtn } from 'js/other';


storiesOf('other/FbBtn', module).add('unknown', () => (
  <FbBtn
    authStatus='unknown'
    onClick={action('onClick')}
  ></FbBtn>
));

storiesOf('other/FbBtn', module).add('not_authorized', () => (
  <FbBtn
    authStatus='not_authorized'
    onClick={action('onClick')}
  ></FbBtn>
));

storiesOf('other/FbBtn', module).add('connected', () => (
  <FbBtn
    authStatus='connected'
    onClick={action('onClick')}
  ></FbBtn>
));