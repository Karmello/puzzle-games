import React from 'react';
import { shallow } from 'enzyme';

import { createNewStore } from 'js/store';
import HighscoresPage from './HighscoresPage';

describe('HighscoresPage component', () => {

  let store, getDefaultProps;

  beforeAll(() => {
    store = createNewStore();
    getDefaultProps = () => ({
      gameOptions: { mode: 'NUM', dimension: '3' },
      highscoresPage: {
        gameFilter: { id: 'boss-puzzle', category: 'sliding' },
        optionsFilter: { mode: 'NUM', dimension: '3' }
      },
      api: {
        clientUser: {
          res: {
            data: { username: 'Karmello' }
          }
        }
      },
      gameFilterToSet: { id: 'boss-puzzle', category: 'sliding' },
      optionsFilterToSet: { mode: 'NUM', dimension: '3' },
      dispatch: store.dispatch
    });
  });

  it('should shallow render', () => {
    shallow(<HighscoresPage.WrappedComponent {...getDefaultProps()} />);
  });

  it('should shallow render', () => {
    const props = getDefaultProps();
    props.highscoresPage.gameFilter = {};
    shallow(<HighscoresPage.WrappedComponent {...props} />);
  });

  it('should shallow render and set props', () => {
    const wrapper = shallow(<HighscoresPage.WrappedComponent {...getDefaultProps()} />);
    wrapper.setProps({
      gameFilterToSet: { id: 'boss-puzzle', category: 'sliding' },
      optionsFilterToSet: { mode: 'IMG', dimension: '5' }
    });
  });
});