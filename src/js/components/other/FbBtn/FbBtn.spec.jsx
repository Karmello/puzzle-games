import React from 'react';
import { shallow } from 'enzyme';

import FbBtn from './FbBtn';

describe('FbBtn', () => {
  it('should render', () => {
    shallow(<FbBtn authStatus={'unknown'} onClick={() => {}} />);
  });
});