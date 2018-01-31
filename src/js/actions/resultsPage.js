export const CHANGE_RESULTS_FILTER = 'CHANGE_RESULTS_FILTER';

export const changeResultsFilter = (gameFilter, optionsFilter) => {
  return {
    type: CHANGE_RESULTS_FILTER,
    payload: {
      filter: {
        game: gameFilter,
        options: optionsFilter
      }
    }
  }
}