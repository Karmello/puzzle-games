import React from 'react';
import { shallow } from 'enzyme';

import { createNewStore } from 'js/store';
import { AppBar } from 'js/containers';

describe('AppBar', () => {

  it('should shallow render and call methods', () => {
    const store = createNewStore();
    const wrapper = shallow(
      <AppBar.WrappedComponent
        dispatch={store.dispatch}
        appName='PuzzleGames'
        game={{
          id: 'boss-puzzle',
          options: { mode: 'NUM', dimension: '3' }
        }}
        gameCategory='sliding'
      />
    );
    const instance = wrapper.instance();
    instance.onDrawerIconClick();
    instance.onMenuItemClick('RESTART');
  });
});