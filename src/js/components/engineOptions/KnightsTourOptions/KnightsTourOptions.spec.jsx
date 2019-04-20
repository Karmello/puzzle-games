import React from 'react';
import { shallow } from 'enzyme';

import KnightsTourOptions from './KnightsTourOptions';

describe('KnightsTourOptions', () => {

  it('should shallow render', () => {
    shallow(<KnightsTourOptions options={{ dimension: '5' }} />);
  });

  it('should shallow render', () => {
    const wrapper = shallow(<KnightsTourOptions options={{ dimension: '5' }} path='/path' />);
    wrapper.instance().onDimensionChange({ target: { value: '8' } });
  });
});