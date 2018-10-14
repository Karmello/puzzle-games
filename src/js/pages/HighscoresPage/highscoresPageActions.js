// @flow

export const CHANGE_HIGHSCORES_FILTER = 'CHANGE_HIGHSCORES_FILTER';
export const HIGHSCORES_PAGE_CLEAR = 'HIGHSCORES_PAGE_CLEAR';

export const changeHighscoresFilter = (gameFilter:{}, optionsFilter:{}) => ({
  type: CHANGE_HIGHSCORES_FILTER,
  payload: {
    gameFilter,
    optionsFilter
  }
});