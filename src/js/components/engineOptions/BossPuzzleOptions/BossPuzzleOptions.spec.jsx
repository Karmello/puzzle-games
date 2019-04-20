import React from 'react';
import { shallow } from 'enzyme';

import BossPuzzleOptions from './BossPuzzleOptions';

describe('BossPuzzleOptions', () => {
  it('should render', () => {
    shallow(<BossPuzzleOptions options={{}} />);
  });
});