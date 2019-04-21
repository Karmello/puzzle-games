import React from 'react';
import { shallow } from 'enzyme';

import { createNewStore } from 'js/store';
import GamePage from './GamePage';

describe('GamePage component', () => {

  let store, getDefaultProps;

  beforeAll(() => {
    store = createNewStore();
    getDefaultProps = () => ({
      dispatch: store.dispatch,
      match: { params: { id: 'boss-puzzle' } },
      gameData: { name: 'BossPuzzle' },
      api: {
        clientUser: { res: { data: {  username: 'Karmello' } } }
      },
      game: {
        isLoading: false,
        isSolved: false
      }
    });
  });

  it('should shallow render and unmount', () => {
    const wrapper = shallow(<GamePage.WrappedComponent {...getDefaultProps()} />);
    wrapper.unmount();
  });

  it('should shallow render and set props', () => {
    const props = getDefaultProps();
    const wrapper = shallow(<GamePage.WrappedComponent {...props} />);
    const instance = wrapper.instance();
    instance.getGameDashboardRef({ timerRef: { state: { seconds: 100 } } });
    wrapper.setProps({ ...props, game: { ...props.game, isSolved: true } });
  });

  it('should shallow render and call a method', () => {
    const props = getDefaultProps();
    const wrapper = shallow(<GamePage.WrappedComponent {...props} />);
    const instance = wrapper.instance();
    instance.getGameDashboardRef();
  });

  it('should shallow render and call a method', () => {
    const wrapper = shallow(<GamePage.WrappedComponent {...getDefaultProps()} />);
    localStorage.setItem('ui', JSON.stringify({ 'Karmello': { gamePage: {} } }));
    wrapper.instance().onToggleExpansionPanel('info', true);
  });
});