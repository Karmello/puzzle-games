import React from 'react';
import { shallow } from 'enzyme';

import store from 'js/store';
import AppDrawer from './AppDrawer';

describe('AppDrawer', () => {  
  it('should render', () => {
    shallow(<AppDrawer store={store} />);
  });
});