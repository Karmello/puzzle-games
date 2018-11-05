import React from 'react';
import { shallow } from 'enzyme';

import store from 'js/store';
import BossPuzzle from './BossPuzzle';

describe('BossPuzzle', () => {
  it('should render', () => {
    shallow(
      <BossPuzzle
        store={store}
        readTimer={() => {}}
      />
    );
  });
});