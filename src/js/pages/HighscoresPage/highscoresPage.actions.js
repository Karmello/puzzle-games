export const CHANGE_HIGHSCORES_FILTER = 'CHANGE_HIGHSCORES_FILTER';

export const changeHighscoresFilter = (gameFilter, optionsFilter) => {
  return {
    type: CHANGE_HIGHSCORES_FILTER,
    payload: {
      gameFilter,
      optionsFilter
    }
  }
}