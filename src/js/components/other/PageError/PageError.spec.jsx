import React from 'react';
import { shallow } from 'enzyme';

import PageError from './PageError';

describe('PageError', () => {
  it('should render', () => {
    shallow(<PageError />);
  });
});