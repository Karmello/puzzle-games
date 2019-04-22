import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { createNewStore } from 'js/store';
import BossPuzzle from './BossPuzzle';

describe('BossPuzzle', () => {

  const store = createNewStore();

  const getDefaultProps = () => ({
    game: {
      isLoading: false,
      isSolved: false,
      options: { mode: 'NUM', dimension: '3' }
    },
    bossPuzzleEngine: {
      tiles: [9, 8, 7, 6, 5, 4, 3, 2, 1],
      hiddenTileCoords: { x: 0, y: 0 },
      imgNumbers: [3, 2, 4, 5, 1],
      imgIndex: 4
    },
    dispatch: store.dispatch
  });

  let shallowWrapper, shallowInstance, props;

  beforeAll(() => {
    shallowWrapper = shallow(<BossPuzzle.WrappedComponent {...getDefaultProps()} />);
    shallowInstance = shallowWrapper.instance();
  });

  beforeEach(() => {
    props = getDefaultProps();
  });

  describe('render method', () => {

    it('should run', () => {
      props.game.isLoading = true;
      shallowWrapper.setProps(props);
      shallowInstance.render();
    });

    it('should run', () => {
      props.game.options.mode = 'IMG';
      shallowWrapper.setProps(props);
      shallowInstance.render();
    });
  });

  describe('renderElement method', () => {

    it('should run', () => {
      shallowWrapper.setProps(props);
      shallowInstance.renderElement()({ style: {}, col: 1, row: 1, index: 4 });
    });

    it('should run', () => {
      props.game.options.mode = 'IMG';
      shallowWrapper.setProps(props);
      shallowInstance.renderElement()({ style: {}, col: 1, row: 1, index: 4 });
    });
  });

  describe('onTileClick method', () => {

    it('should run', () => {
      shallowWrapper.setProps(props);
      shallowInstance.onTileClick({ col: 0, row: 1 });
    });

    it('should run', () => {
      shallowWrapper.setProps({ ...props, game: { ...props.game, isSolved: true } });
      shallowInstance.onTileClick({ col: 0, row: 1 });
    });
  });

  describe('getTileLabel method', () => {

    it('should run', () => {
      props.bossPuzzleEngine.tiles = [];
      shallowWrapper.setProps(props);
      shallowInstance.getTileLabel({ index: 1 });
    });
  });

  describe('getElementStyle method', () => {

    it('should run', () => {
      shallowWrapper.setProps(props);
      shallowInstance.getElementStyle({ col: 1, row: 1, index: 4, size: 80 });
    });

    it('should run', () => {
      props.game.options.dimension = undefined;
      shallowWrapper.setProps(props);
      shallowInstance.getElementStyle({ col: 0, row: 0, index: 4, size: 80 });
    });

    it('should run', () => {
      props.game.options.mode = 'IMG';
      shallowWrapper.setProps(props);
      shallowInstance.getElementStyle({ col: 0, row: 0, index: 4, size: 80 });
    });

    it('should run', () => {
      props.game.options.mode = 'IMG';
      shallowWrapper.setState({ imgSrc: 'imagesource' });
      shallowWrapper.setProps(props);
      shallowInstance.getElementStyle({ col: 1, row: 1, index: 4, size: 80 });
    });
  });

  describe('startNew method', () => {

    it('should run', done => {
      shallowWrapper.setProps(props);
      shallowInstance.startNew();
      setTimeout(done);
    });

    it('should run', done => {
      props.game.options.mode = 'IMG';
      shallowWrapper.setProps(props);
      shallowInstance.startNew();
      setTimeout(done);
    });

    it('should run', done => {
      props.game.options.mode = 'IMG';
      shallowWrapper.setProps(props);
      shallowInstance.startNew(true);
      setTimeout(done);
    });

    it('should run', done => {
      props.game.options.mode = 'IMG';
      props.bossPuzzleEngine.imgIndex = 1;
      shallowWrapper.setProps(props);
      shallowInstance.startNew();
      setTimeout(done);
    });

    it('should run', done => {
      props.game.options.mode = 'IMG';
      props.bossPuzzleEngine.imgIndex = undefined;
      shallowWrapper.setProps(props);
      shallowInstance.startNew(true);
      setTimeout(done);
    });
  });

  describe('checkIfSolved method', () => {

    it('should run', () => {
      shallowWrapper.setProps(props);
      shallowInstance.checkIfSolved();
    });

    it('should run', () => {
      props.bossPuzzleEngine.tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      shallowWrapper.setProps(props);
      shallowInstance.checkIfSolved();
    });
  });

  describe('finishing', () => {

    it('should unmount', () => {
      shallowWrapper.unmount();
    });
  });
});
