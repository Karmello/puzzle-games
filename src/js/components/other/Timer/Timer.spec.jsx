import React from 'react';
import { shallow } from 'enzyme';

import Timer from './Timer';

describe('Timer', () => {
  it('should render', () => {
    shallow(<Timer on paused={false} />);
  });
});