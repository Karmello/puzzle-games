import React from 'react';
import { shallow, mount } from 'enzyme';

import GameOptions from './GameOptions';

describe('GameOptions', () => {

  it('should shallow render', () => {
    shallow(
      <GameOptions
        options={{ mode: 'NUM', dimension: '3' }}
        Content={() => <div>content</div>}
      />
    );
  });

  it('should mount and set props', () => {
    const wrapper = mount(
      <GameOptions
        options={{ mode: 'NUM', dimension: '3' }}
        Content={() => <div>content</div>}
      />
    );
    wrapper.setProps({ options: { mode: 'IMG', dimension: '5' }});
    wrapper.setProps({ options: { mode: 'NUM', dimension: '3' }});
  });
});