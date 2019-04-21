import React from 'react';
import { shallow } from 'enzyme';

import GameBtn from './GameBtn';

describe('GameBtn', () => {

  it('should shallow render', () => {
    shallow(<GameBtn />);
  });

  it('should shallow render', () => {
    shallow(<GameBtn name='play' />);
  });

  it('should shallow render', () => {
    shallow(<GameBtn name='highscores' />);
  });

  it('should shallow render', () => {
    shallow(<GameBtn name='highscores' gameOptions={{ mode: 'NUM', dimension: '3' }} />);
  });
});
