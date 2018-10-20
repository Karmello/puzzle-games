import gamesPageReducer from 'js/reducers/gamesPage';
import { switchGameCategoryTab, changeGameOptions } from 'js/actions/gamesPage';


describe('gamesPageReducer', () => {

  it('should return the initial state', () => {
    expect(gamesPageReducer(undefined, {})).toEqual({
      category: '',
      options: { 'boss-puzzle': {} }
    });
  });

  it('should handle SWITCH_GAME_CATEGORY_TAB', () => {
    expect(gamesPageReducer({
      category: 'sliding',
      options: {
        'boss-puzzle': { mode: 'NUM', dimension: '3' }
      }
    }, switchGameCategoryTab('chess'))).toEqual({
      category: 'chess',
      options: {
        'boss-puzzle': { mode: 'NUM', dimension: '3' }
      }
    });
  });

  it('should handle CHANGE_GAME_OPTIONS', () => {

    expect(gamesPageReducer({
      category: 'sliding',
      options: {
        'boss-puzzle': { mode: 'NUM', dimension: '3' }
      }
    }, changeGameOptions('boss-puzzle', { mode: 'IMG' }))).toEqual({
      category: 'sliding',
      options: {
        'boss-puzzle': { mode: 'IMG', dimension: '3' }
      }
    });

    expect(gamesPageReducer({
      category: 'sliding',
      options: {
        'boss-puzzle': { mode: 'NUM', dimension: '3' }
      }
    }, changeGameOptions('boss-puzzle', { mode: 'IMG', dimension: '5' }))).toEqual({
      category: 'sliding',
      options: {
        'boss-puzzle': { mode: 'IMG', dimension: '5' }
      }
    });
  });
});