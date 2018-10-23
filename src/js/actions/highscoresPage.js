// @flow
export const HIGHSCORES_PAGE_CHANGE_FILTER = 'HIGHSCORES_PAGE_CHANGE_FILTER';
export const HIGHSCORES_PAGE_CLEAR = 'HIGHSCORES_PAGE_CLEAR';

export const changeHighscoresFilter = (gameFilter:{}, optionsFilter:{}) => ({
  type: HIGHSCORES_PAGE_CHANGE_FILTER,
  payload: {
    gameFilter,
    optionsFilter
  }
});