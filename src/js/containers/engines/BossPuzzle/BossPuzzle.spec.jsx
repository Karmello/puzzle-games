import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import store from 'js/store';
import BossPuzzle from './BossPuzzle';

describe('BossPuzzle', () => {
  it('should render', () => {
    shallow(
      <Provider store={store}>
        <BossPuzzle />
      </Provider>
    );
  });
});