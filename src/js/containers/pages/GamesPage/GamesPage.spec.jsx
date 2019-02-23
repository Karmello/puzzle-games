import React from 'react';
import { shallow } from 'enzyme';

import { createNewStore } from 'js/store';
import GamesPage from './GamesPage';

describe('GamesPage component', () => {

  let store, getDefaultProps;

  beforeAll(() => {
    store = createNewStore();
    getDefaultProps = () => ({
      dispatch: store.dispatch,
      api: {
        gameCategories: { res: { data: [{ id: 'sliding' }, { id: 'chess' }] } },
        games: {
          res: {
            data: [
              { id: 'boss-puzzle', categoryId: 'sliding' },
              { id: 'eight-queens', categoryId: 'chess' }
            ]
          }
        },
        clientUser: { res: { data: { username: 'Karmello' } } }
      },
      gamesPage: {
        category: 'sliding',
        options: { mode: 'NUM', dimension: '3' }
      }
    });
  });

  it('should shallow render and unmount', () => {
    const wrapper = shallow(<GamesPage.WrappedComponent {...getDefaultProps()} />);
    wrapper.unmount();
  });

  it('should shallow render and set props', () => {
    const props = getDefaultProps();
    const wrapper = shallow(<GamesPage.WrappedComponent {...props} />);
    localStorage.setItem('ui', JSON.stringify({ 'Karmello': { gamesPage: { category: '' } } }));
    wrapper.setProps({ ...props, gameCategoryToSet: 'chess' });
  });

  it('should shallow render and call methods', done => {
    const wrapper = shallow(<GamesPage.WrappedComponent {...getDefaultProps()} />);
    const instance = wrapper.instance();
    localStorage.setItem('ui', JSON.stringify({
      'Karmello': { gamesPage: { options: { 'boss-puzzle': { mode: 'NUM', dimension: '4' } } } }
    }));
    instance.onGameOptionsChange('boss-puzzle', { mode: 'NUM', dimension: '5' });
    instance.onSwipe(0);
    setTimeout(done, 300);
  });
});