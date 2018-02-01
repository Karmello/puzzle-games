export const CHANGE_RESULTS_FILTER = 'CHANGE_RESULTS_FILTER';

export const changeResultsFilter = (categoryId, gameId, gameOptions) => {
  return {
    type: CHANGE_RESULTS_FILTER,
    payload: {
      category: categoryId,
      id: gameId,
      options: gameOptions
    }
  }
}