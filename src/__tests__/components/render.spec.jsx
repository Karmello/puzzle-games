import React from 'react';
import { shallow } from 'enzyme';

import store from 'js/store';
import { App, AppBar, AppDrawer } from 'js/app';
import { BossPuzzle, SquareTile, EightQueens } from 'js/engines';


describe('app', () => {
  
  it('App should render', () => {
    shallow(<App />);
  });

  it('AppBar should render', () => {
    shallow(<AppBar store={store} />);
  });

  it('AppDrawer should render', () => {
    shallow(<AppDrawer store={store} />);
  });
});

describe('engines', () => {
  
  it('BossPuzzle should render', () => {
    shallow(<BossPuzzle store={store} />);
  });

  it('SquareTile should render', () => {
    shallow(
      <SquareTile
        options={{}}
        hiddenTileCoords={{ x: 0, y: 0 }}
        tiles={[2, 4, 6, 3, 1, 5, 7, 9, 8]}
        imgSrc={'img.png'}
        row={'0'}
        col={'0'}
        isSolved={false}
        onMoveMade={() => {}}
      />
    );
  });

  it('EightQueens should render', () => {
    shallow(<EightQueens />);
  });
});