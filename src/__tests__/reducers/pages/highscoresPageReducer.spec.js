import highscoresPageReducer from 'js/pages/HighscoresPage/highscoresPage.reducer';
import { changeHighscoresFilter } from 'js/pages/HighscoresPage/highscoresPage.actions';


describe('highscoresPageReducer', () => {

  it('should return the initial state', () => {
    expect(highscoresPageReducer(undefined, {})).toEqual({
      gameFilter: {},
      optionsFilter: {}
    });
  });

  it('should handle CHANGE_HIGHSCORES_FILTER', () => {

    expect(highscoresPageReducer({
      gameFilter: { category: 'sliding', id: 'boss-puzzle' },
      optionsFilter: { mode: 'NUM', dimension: '3' }
    }, changeHighscoresFilter({ category: 'chess', id: 'eight-queens' }, {}))).toEqual({
      gameFilter: { category: 'chess', id: 'eight-queens' },
      optionsFilter: {}
    });
  });
});