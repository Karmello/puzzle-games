import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import store from 'js/store';
import KnightsTour from './KnightsTour';

describe('KnightsTour', () => {
  it('should render', () => {
    shallow(
      <Provider store={store}>
        <KnightsTour />
      </Provider>
    );
  });
});