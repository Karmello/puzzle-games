export const CHANGE_RESULTS_FILTER = 'CHANGE_RESULTS_FILTER';
export const SET_ACTIVE_COLUMN = 'SET_ACTIVE_COLUMN';
export const TOGGLE_COLUMN_SORT_DIRECTION = 'TOGGLE_COLUMN_SORT_DIRECTION';

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

export const setActiveColumn = (index) => {
  return {
    type: SET_ACTIVE_COLUMN,
    payload: {
      activeColumnIndex: index,
    }
  }
}

export const toggleColumnSortDirection = (index) => {
  return {
    type: TOGGLE_COLUMN_SORT_DIRECTION,
    meta: {
      columnIndex: index
    }
  }
}