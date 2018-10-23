import highscoresPageReducer from 'js/reducers/highscoresPage';
import { changeHighscoresFilter } from 'js/actions/highscoresPage';


describe('highscoresPageReducer', () => {

  it('should return the initial state', () => {
    expect(highscoresPageReducer(undefined, {})).toEqual({
      gameFilter: {},
      optionsFilter: {}
    });
  });

  it('should handle HIGHSCORES_PAGE_CHANGE_FILTER', () => {

    expect(highscoresPageReducer({
      gameFilter: { category: 'sliding', id: 'boss-puzzle' },
      optionsFilter: { mode: 'NUM', dimension: '3' }
    }, changeHighscoresFilter({ category: 'chess', id: 'eight-queens' }, {}))).toEqual({
      gameFilter: { category: 'chess', id: 'eight-queens' },
      optionsFilter: {}
    });
  });
});