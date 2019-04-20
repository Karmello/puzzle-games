import React from 'react';
import { shallow } from 'enzyme';

import { createNewStore } from 'js/store';
import AppDrawer from './AppDrawer';

describe('AppDrawer', () => {
  it('should shallow render and call methods', done => {
    const store = createNewStore();
    const wrapper = shallow(
      <AppDrawer.WrappedComponent
        dispatch={store.dispatch}
        app={{ showDrawer: false, authStatus: 'logged_in' }}
        clientUser={{ res: { status: 200, data: { username: 'Karmello' } } }}
        pages={{
          gamesPage: { category: 'sliding' },
          highscoresPage: {
            gameFilter: { id: 'boss-puzzle' },
            optionsFilter: {}
          }
        }}
      />
    );
    const instance = wrapper.instance();
    instance.onDrawerClose();
    instance.onLogout();
    setTimeout(done, 1000);
  });
});