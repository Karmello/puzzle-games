// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'enzyme';

import store from 'js/store';
import { App } from 'js/containers';

export const shuffleIntArray = (array:Array<number>) => {
  let i = array.length, j = 0, temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export const kebabToCamelCase = (id:string) => {
  return id.split('-').map(s => `${s[0].toUpperCase()}${s.slice(1)}`).join('');
}

export const renderWrapper = (initialEntries:Array<string>, initialIndex:number) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}
