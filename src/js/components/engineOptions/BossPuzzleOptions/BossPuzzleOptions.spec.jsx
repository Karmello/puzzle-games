import React from 'react';
import { shallow } from 'enzyme';

import BossPuzzleOptions from './BossPuzzleOptions';

describe('BossPuzzleOptions', () => {

  it('should shallow render', () => {
    shallow(<BossPuzzleOptions options={{ mode: 'NUM', dimension: '3' }} />);
  });

  it('should shallow render', () => {
    shallow(<BossPuzzleOptions options={{ mode: 'NUM', dimension: '3' }} disabled />);
  });

  it('should shallow render', () => {
    shallow(<BossPuzzleOptions options={{ mode: 'NUM', dimension: '3' }} path='/path' />);
  });

  it('should shallow render', done => {
    const wrapper = shallow(
      <BossPuzzleOptions
        options={{ mode: 'NUM', dimension: '3' }}
        disabled
        path='/path'
        onValueChangeCb={() => {}}
      />
    );
    const instance = wrapper.instance();
    instance.onModeChange({ target: { value: 'IMG' } });
    instance.onDimensionChange({ target: { value: '5' } });
    instance.onDimensionChange({ target: { value: '5' } });
    setTimeout(done);
  });
});