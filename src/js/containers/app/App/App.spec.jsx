import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import { createNewStore } from 'js/store';
import { setAuthStatus } from 'js/actions/app';
import { API_SAVE_NEW_HIGHSCORE } from 'js/actions/api';
import { apiRequestSuccess } from 'js/creators/action/api';
import App from './App';

describe('App', () => {

  let store, getComponent;
  beforeAll(() => {
    store = createNewStore();
    getComponent = store => (
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should shallow render', () => {
    shallow(<App />);
  });

  it('should mount', () => {
    mount(getComponent(store));
  });

  it('should mount', () => {
    store.dispatch(setAuthStatus('logged_out'));
    mount(getComponent(store));
  });

  it('should mount', () => {
    const state = store.getState();
    state.api.newHighscore.req.isAwaiting = true;
    store.dispatch(apiRequestSuccess(API_SAVE_NEW_HIGHSCORE, { status: 200, config: {} }));
    mount(getComponent(store));
  });
});