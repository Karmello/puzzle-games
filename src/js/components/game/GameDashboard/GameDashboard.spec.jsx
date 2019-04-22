import React from 'react';
import { shallow, mount } from 'enzyme';

import GameDashboard from './GameDashboard';

describe('GameDashboard', () => {

  it('should shallow render', () => {
    shallow(
      <GameDashboard
        clientUserData={{ username: 'Karmello' }}
        game={{
          isLoading: true,
          isSolved: false,
          moves: 0
        }}
      />
    );
  });

  it('should shallow render', () => {
    shallow(
      <GameDashboard
        clientUserData={{ username: 'Karmello' }}
        game={{
          isLoading: false,
          isSolved: false,
          moves: 5
        }}
      />
    );
  });

  it('should mount and run method', () => {
    const wrapper = mount(
      <GameDashboard
        clientUserData={{ username: 'Karmello' }}
        game={{
          isLoading: false,
          isSolved: false,
          moves: 5
        }}
      />
    );
    wrapper.instance().getRef();
  });
});
