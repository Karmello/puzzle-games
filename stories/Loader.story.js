import React from 'react';
import { storiesOf } from '@storybook/react';
import { Loader } from 'js/other';


const style = {
  'border': '1px solid',
  'width': '500px',
  'height': '250px'
}

const style2 = {
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'height': '250px'
}


storiesOf('other/Loader', module).add('on', () => (
  <div style={style}>
    <Loader isShown={true}>
      <div style={style2}>some content</div>
    </Loader>
  </div>
));

storiesOf('other/Loader', module).add('off', () => (
  <div style={style}>
    <Loader isShown={false}>
      <div style={style2}>some content</div>
    </Loader>
  </div>
));