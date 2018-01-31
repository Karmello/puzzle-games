export const CHANGE_RESULTS_FILTER = 'CHANGE_RESULTS_FILTER';

export const changeResultsFilter = (game, options) => {
  return {
    type: CHANGE_RESULTS_FILTER,
    payload: {
      filter: {
        game: game,
        options: options
      }
    }
  }
}