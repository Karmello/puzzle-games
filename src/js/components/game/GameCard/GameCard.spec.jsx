import React from 'react';
import { shallow } from 'enzyme';

import GameCard from './GameCard';

describe('GameCard', () => {

  it('should shallow render', () => {
    const wrapper = shallow(
      <GameCard
        gameData={{
          id: 'boss-puzzle',
          categoryId: 'chess',
          name: 'BossPuzzle',
          description: '...'
        }}
        gameOptions={{
          mode: 'NUM',
          dimension: '3'
        }}
        onGameOptionsChange={() => {}}
      />
    );
    wrapper.instance().onValueChangeCb();
  });
});