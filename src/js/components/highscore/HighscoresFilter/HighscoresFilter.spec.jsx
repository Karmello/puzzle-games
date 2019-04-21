import React from 'react';
import { mount } from 'enzyme';

import HighscoresFilter from './HighscoresFilter';

describe('HighscoresFilter', () => {

  let getDefaultProps;

  beforeAll(() => {
    getDefaultProps = () => ({
      gameFilter: { id: 'boss-puzzle', category: 'sliding' },
      gameOptions: {
        'boss-puzzle': { mode: 'NUM', dimension: '3' },
      },
      optionsFilter: { mode: 'NUM', dimension: '3' },
      api: {
        highscores: {
          req: { isAwaiting: false },
          res: { status: 200 }
        },
        gameCategories: {
          res: {
            data: [
              { id: 'chess' },
              { id: 'sliding' }
            ]
          }
        },
        games: {
          res: {
            data: [
              { id: 'boss-puzzle', categoryId: 'sliding' },
              { id: 'eight-queens', categoryId: 'chess' }
            ]
          }
        }
      }
    })
  });

  it('should mount and set props', () => {
    const props = getDefaultProps();
    const wrapper = mount(<HighscoresFilter {...props} />);
    props.gameFilter.id = 'eight-queens';
    props.gameFilter.category = 'chess';
    wrapper.setProps(props);
  });
});
