import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import { createNewStore } from 'js/store';
import { startGame, stopGameLoader } from 'js/actions/game';
import BossPuzzle from './BossPuzzle';

describe('BossPuzzle', () => {

  let store, getComponent;
  beforeAll(() => {
    store = createNewStore();
    getComponent = store => (
      <Provider store={store}>
        <BossPuzzle />
      </Provider>
    );
  });

  it('should shallow render', () => {
    shallow(getComponent(store));
  });

  it('should mount', () => {
    store.dispatch(startGame('boss-puzzle', { mode: 'NUM', dimension: '3' }));
    store.dispatch(stopGameLoader());
    mount(getComponent(store));
  });

  it('should mount', () => {
    store.dispatch(startGame('boss-puzzle', { mode: 'IMG', dimension: '5' }));
    store.dispatch(stopGameLoader());
    mount(getComponent(store));
  });

  it('should mount and unmount', () => {
    store.dispatch(startGame('boss-puzzle', { mode: 'IMG', dimension: '5' }));
    store.dispatch(stopGameLoader());
    const wrapper = mount(getComponent(store));
    wrapper.unmount();
  });
});