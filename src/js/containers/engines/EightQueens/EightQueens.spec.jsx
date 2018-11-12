import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import store from 'js/store';
import EightQueens from './EightQueens';

describe('EightQueens', () => {
  it('should render', () => {
    shallow(
      <Provider store={store}>
        <EightQueens />
      </Provider>
    );
  });
});