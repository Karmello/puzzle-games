import React from 'react';
import { shallow } from 'enzyme';

import store from 'js/store';
import EightQueens from './EightQueens';

describe('EightQueens', () => {
  it('should render', () => {
    shallow(<EightQueens
      store={store}
      readTimer={() => {}}
    />);
  });
});