import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import { createNewStore } from 'js/store';
import { startGame, stopGameLoader } from 'js/actions/game';
import Tetris from './Tetris';

describe('Tetris', () => {

  let store, getComponent;
  beforeAll(() => {
    store = createNewStore();
    getComponent = store => (
      <Provider store={store}>
        <Tetris />
      </Provider>
    );
  });

  it('should shallow render', () => {
    shallow(getComponent(store));
  });

  it('should mount and unmount', () => {
    store.dispatch(startGame('tetris'));
    store.dispatch(stopGameLoader());
    const wrapper = mount(getComponent(store));
    wrapper.unmount();
  });
});