import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { render } from 'enzyme';

import store from 'js/store';
import { App } from 'js/app';


export const renderWrapper = (initialEntries, initialIndex) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}