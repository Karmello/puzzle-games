import React from 'react';
import { shallow } from 'enzyme';

import MySnackBar from './MySnackBar';

describe('MySnackBar', () => {
  it('should render', () => {
    shallow(<MySnackBar message={'message'} onClose={() => {}} />);
  });
});