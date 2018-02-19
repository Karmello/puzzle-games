export const CHANGE_HIGHSCORES_FILTER = 'CHANGE_HIGHSCORES_FILTER';

export const changeHighscoresFilter = (categoryId, gameId, gameOptions) => {
  return {
    type: CHANGE_HIGHSCORES_FILTER,
    payload: {
      category: categoryId,
      id: gameId,
      options: gameOptions
    }
  }
}