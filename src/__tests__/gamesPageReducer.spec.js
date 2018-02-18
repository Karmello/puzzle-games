import gamesPageReducer from 'js/pages/GamesPage/gamesPage.reducer';
//import { SWITCH_GAME_CATEGORY_TAB, CHANGE_GAME_OPTIONS } from 'js/pages/GamesPage/gamesPage.actions';
 

describe('gamesPageReducer', () => {
  it('should return the initial state', () => {
    expect(gamesPageReducer(undefined, {})).toEqual({
      category: 'sliding',
      options: {
        BossPuzzle: { mode: 'NUM', dimension: '3' },
        EightQueens: {}
      }
    });
  });
});