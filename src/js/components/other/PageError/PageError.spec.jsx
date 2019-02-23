import React from 'react';
import { shallow } from 'enzyme';

import PageError from './PageError';

describe('PageError', () => {

  it('should shallow render', done => {
    const wrapper = shallow(<PageError />);
    const instance = wrapper.instance();
    instance.onReloadClick();
    setTimeout(done, 300);
  });
});