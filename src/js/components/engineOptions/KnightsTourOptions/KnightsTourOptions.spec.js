import React from 'react';
import { shallow } from 'enzyme';

import KnightsTourOptions from './KnightsTourOptions';

describe('KnightsTourOptions', () => {
  it('should render', () => {
    shallow(<KnightsTourOptions options={{}} />);
  });
});