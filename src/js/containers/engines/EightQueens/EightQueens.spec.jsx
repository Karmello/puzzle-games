import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import { createNewStore } from 'js/store';
import { startGame, stopGameLoader } from 'js/actions/game';
import EightQueens from './EightQueens';

describe('EightQueens', () => {

  let store, getComponent;
  beforeAll(() => {
    store = createNewStore();
    getComponent = store => (
      <Provider store={store}>
        <EightQueens />
      </Provider>
    );
  });

  it('should shallow render', () => {
    shallow(getComponent(store));
  });

  it('should mount and unmount', () => {
    store.dispatch(startGame('eight-queens'));
    store.dispatch(stopGameLoader());
    const wrapper = mount(getComponent(store));
    wrapper.unmount();
  });
});