import { SET_ACTIVE_COLUMN, TOGGLE_COLUMN_SORT_DIRECTION } from './../resultsPage.actions';

const initialState = {
  activeColumnIndex: 0,
  columns: [
    { label: 'Date', isInAscOrder: true },
    { label: 'Player', isInAscOrder: true },
    { label: 'Moves', isInAscOrder: true, isNumeric: true },
    { label: 'Time', isInAscOrder: true }
  ]
};

const resultsTableReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_ACTIVE_COLUMN:
      return {
        ...state,
        activeColumnIndex: action.payload.activeColumnIndex
      }

    case TOGGLE_COLUMN_SORT_DIRECTION:
      const columnIndex = action.meta.columnIndex;
      return {
        ...state,
        columns: [
          ...state.columns.slice(0, columnIndex),
          { ...state.columns[columnIndex], isInAscOrder: !state.columns[columnIndex].isInAscOrder },
          ...state.columns.slice(columnIndex + 1)
        ]
      }

    default:
      return state;
  }
}

export default resultsTableReducer;