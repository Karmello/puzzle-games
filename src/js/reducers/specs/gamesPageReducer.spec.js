import gamesPageReducer from 'js/reducers/gamesPage';
import { switchGameCategoryTab, changeGameOptions } from 'js/actions/gamesPage';


describe('gamesPageReducer', () => {

  it('should return the initial state', () => {
    expect(gamesPageReducer(undefined, {})).toEqual({
      category: '',
      options: {
        'boss-puzzle': {},
        'knights-tour': {}
      }
    });
  });

  it('should handle GAMES_PAGE_SWITCH_CATEGORY_TAB', () => {
    expect(gamesPageReducer({
      category: 'sliding',
      options: {
        'boss-puzzle': { mode: 'NUM', dimension: '3' },
        'knights-tour': {}
      }
    }, switchGameCategoryTab('chess'))).toEqual({
      category: 'chess',
      options: {
        'boss-puzzle': { mode: 'NUM', dimension: '3' },
        'knights-tour': {}
      }
    });
  });

  it('should handle GAMES_PAGE_CHANGE_GAME_OPTIONS', () => {

    expect(gamesPageReducer({
      category: 'sliding',
      options: {
        'boss-puzzle': { mode: 'NUM', dimension: '3' },
        'knights-tour': {}
      }
    }, changeGameOptions('boss-puzzle', { mode: 'IMG' }))).toEqual({
      category: 'sliding',
      options: {
        'boss-puzzle': { mode: 'IMG', dimension: '3' },
        'knights-tour': {}
      }
    });

    expect(gamesPageReducer({
      category: 'sliding',
      options: {
        'boss-puzzle': { mode: 'NUM', dimension: '3' },
        'knights-tour': {}
      }
    }, changeGameOptions('boss-puzzle', { mode: 'IMG', dimension: '5' }))).toEqual({
      category: 'sliding',
      options: {
        'boss-puzzle': { mode: 'IMG', dimension: '5' },
        'knights-tour': {}
      }
    });
  });
});
