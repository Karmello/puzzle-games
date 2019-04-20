import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import { createNewStore } from 'js/store';
import { startGame, stopGameLoader } from 'js/actions/game';
import KnightsTour from './KnightsTour';

describe('KnightsTour', () => {

  let store, getComponent;
  beforeAll(() => {
    store = createNewStore();
    getComponent = store => (
      <Provider store={store}>
        <KnightsTour />
      </Provider>
    );
  });

  it('should shallow render', () => {
    shallow(getComponent(store));
  });

  it('should mount', () => {
    store.dispatch(startGame('knights-tour', { dimension: '5' }));
    store.dispatch(stopGameLoader());
    mount(getComponent(store));
  });

  it('should mount', () => {
    store.dispatch(startGame('knights-tour', { dimension: '8' }));
    store.dispatch(stopGameLoader());
    mount(getComponent(store));
  });

  it('should mount and unmount', () => {
    store.dispatch(startGame('knights-tour', { dimension: '5' }));
    store.dispatch(stopGameLoader());
    const wrapper = mount(getComponent(store));
    wrapper.unmount();
  });
});