import React from 'react';
import { shallow } from 'enzyme';

import store from 'js/store';
import { GamePage } from 'js/containers';

describe('GamePage', () => {
  it('should render', () => {
    shallow(<GamePage store={store} />);
  });
});