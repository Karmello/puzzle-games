import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import store from 'js/store';
import Sudoku from './Sudoku';

describe('Sudoku', () => {
  it('should render', () => {
    shallow(
      <Provider store={store}>
        <Sudoku />
      </Provider>
    );
  });
});