// @flow
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render } from "enzyme";

import store from "js/store";
import { App } from "js/containers";

export const renderWrapper = (
  initialEntries: Array<string>,
  initialIndex: number,
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        <App />
      </MemoryRouter>
    </Provider>,
  );
};
