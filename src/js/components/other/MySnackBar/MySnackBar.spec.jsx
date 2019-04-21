import React from 'react';
import { shallow } from 'enzyme';

import MySnackBar from './MySnackBar';

describe('MySnackBar', () => {

  it('should shallow render and run method', () => {
    const wrapper = shallow(
      <MySnackBar
        message={'message'}
        onClose={() => {}}
      />
    );
    wrapper.instance().onClose();
  });
});
