import React from 'react';
import { shallow } from 'enzyme';

import store from 'js/store';
import { AppBar } from 'js/containers';

describe('AppBar', () => {  
  it('should render', () => {
    shallow(<AppBar store={store} />);
  });
});