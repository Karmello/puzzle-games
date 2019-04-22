import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { createNewStore } from 'js/store';
import BossPuzzle from './BossPuzzle';

describe('BossPuzzle', () => {

  let store, getDefaultProps;

  beforeAll(() => {
    store = createNewStore();
    getDefaultProps = () => ({
      game: {
        isLoading: false,
        isSolved: false,
        options: { mode: 'NUM', dimension: '3' }
      },
      bossPuzzleEngine: {
        tiles: [9, 8, 7, 6, 5, 4, 3, 2, 1],
        hiddenTileCoords: { x: 0, y: 0 }
      },
      dispatch: store.dispatch
    });
  });

  it('should shallow render and unmount', () => {
    const wrapper = shallow(<BossPuzzle.WrappedComponent {...getDefaultProps()} />);
    wrapper.unmount();
  });

  it('should shallow render', () => {
    const props = getDefaultProps();
    props.game.isLoading = true;
    shallow(<BossPuzzle.WrappedComponent {...props} />);
  });

  it('should shallow render', () => {
    const props = getDefaultProps();
    props.game.options.mode = 'IMG';
    shallow(<BossPuzzle.WrappedComponent {...props} />);
  });

  it('should shallow render and test renderElement method', () => {
    const props = getDefaultProps();
    const wrapper = shallow(<BossPuzzle.WrappedComponent {...props} />);
    const instance = wrapper.instance();
    instance.renderElement()({ style: {}, col: 1, row: 1, index: 4 });
    props.game.options.mode = 'IMG';
    instance.renderElement()({ style: {}, col: 1, row: 1, index: 4 });
  });

  it('should shallow render and test onTileClick method', () => {
    const props = getDefaultProps();
    const wrapper = shallow(<BossPuzzle.WrappedComponent {...props} />);
    const instance = wrapper.instance();
    instance.onTileClick({ col: 0, row: 1 });
    wrapper.setProps({ ...props, game: { ...props.game, isSolved: true } });
    instance.onTileClick({ col: 0, row: 1 });
  });

  it('should shallow render and test getTileLabel method', () => {
    const props = getDefaultProps();
    const wrapper = shallow(<BossPuzzle.WrappedComponent {...props} />);
    const instance = wrapper.instance();
    props.bossPuzzleEngine.tiles = [];
    instance.getTileLabel({ index: 1 });
  });

  it('should shallow render and test getElementStyle method', () => {
    const props = getDefaultProps();
    const wrapper = shallow(<BossPuzzle.WrappedComponent {...props} />);
    const instance = wrapper.instance();
    instance.getElementStyle({ col: 1, row: 1, index: 4, size: 80 });
  });
});
