import React from 'react';
import { shallow } from 'enzyme';

import GameMenu from './GameMenu';

describe('GameMenu', () => {

  it('should shallow render', () => {
    shallow(<GameMenu />);
  });

  it('should shallow render and run methods', () => {
    const wrapper = shallow(
      <GameMenu
        gameCategory='chess'
        showRestartBtn={true}
        onItemClick={() => {}}
      />
    );
    const instance = wrapper.instance();
    instance.onItemClick();
    instance.onItemClick('itemId');
    instance.onMenuShow({ currentTarget: {} });
    instance.onMenuClose();
    instance.onNewBtnClick();
    instance.onRestartBtnClick();
    instance.onEndBtnClick();
  });
});
