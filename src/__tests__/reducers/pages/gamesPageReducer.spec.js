import gamesPageReducer from 'js/pages/GamesPage/gamesPage.reducer';
import { switchGameCategoryTab, changeGameOptions } from 'js/pages/GamesPage/gamesPage.actions';


describe('gamesPageReducer', () => {

  it('should return the initial state', () => {
    expect(gamesPageReducer(undefined, {})).toEqual({
      category: '',
      options: { BossPuzzle: {} }
    });
  });

  it('should handle SWITCH_GAME_CATEGORY_TAB', () => {
    expect(gamesPageReducer({
      category: 'sliding',
      options: {
        BossPuzzle: { mode: 'NUM', dimension: '3' }
      }
    }, switchGameCategoryTab('chess'))).toEqual({
      category: 'chess',
      options: {
        BossPuzzle: { mode: 'NUM', dimension: '3' }
      }
    });
  });

  it('should handle CHANGE_GAME_OPTIONS', () => {

    expect(gamesPageReducer({
      category: 'sliding',
      options: {
        BossPuzzle: { mode: 'NUM', dimension: '3' }
      }
    }, changeGameOptions('BossPuzzle', { mode: 'IMG' }))).toEqual({
      category: 'sliding',
      options: {
        BossPuzzle: { mode: 'IMG', dimension: '3' }
      }
    });

    expect(gamesPageReducer({
      category: 'sliding',
      options: {
        BossPuzzle: { mode: 'NUM', dimension: '3' }
      }
    }, changeGameOptions('BossPuzzle', { mode: 'IMG', dimension: '5' }))).toEqual({
      category: 'sliding',
      options: {
        BossPuzzle: { mode: 'IMG', dimension: '5' }
      }
    });
  });
});