import React from 'react';
import { shallow, mount } from 'enzyme';

import Timer from './Timer';

describe('Timer', () => {

  it('should shallow render', () => {
    shallow(<Timer />);
  });

  it('should mount and receive props', () => {
    const wrapper = mount(<Timer />);
    wrapper.setProps({ on: true, paused: false });
    wrapper.setProps({ on: false, paused: true });
    wrapper.setProps({ on: false, paused: false });
  });

  it('should mount and unmount', () => {
    const wrapper = mount(<Timer />);
    wrapper.unmount();
  });
});