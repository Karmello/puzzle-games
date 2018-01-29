export const CHANGE_RESULTS_FILTER = 'CHANGE_RESULTS_FILTER';

export const changeResultsFilter = (gameId, options) => {
  return {
    type: CHANGE_RESULTS_FILTER,
    payload: {
      gameId: gameId,
      options: options
    }
  }
}