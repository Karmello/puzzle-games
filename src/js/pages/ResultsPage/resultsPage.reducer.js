import { CHANGE_RESULTS_FILTER, SET_ACTIVE_COLUMN, TOGGLE_COLUMN_SORT_DIRECTION } from './resultsPage.actions';

const initialState = {
  filter: {
    game: { category: 'sliding', id: 'BossPuzzle' },
    options: { mode: 'NUM', dimension: '3' }
  },
  table: {
    columns: [
      { label: 'Date', isInAscOrder: true },
      { label: 'Player', isInAscOrder: true },
      { label: 'Moves', isInAscOrder: true, isNumeric: true },
      { label: 'Time', isInAscOrder: true }
    ],
    activeColumnIndex: 0
  }
};

const resultsReducer = (state = initialState, action) => {

  switch (action.type) {

    case CHANGE_RESULTS_FILTER:
  
      const { category, id, options } = action.payload;
      const newFilter = { ...state.filter };

      if (category) { newFilter.game.category = category; }
      if (id) { newFilter.game.id = id; }
      if (options) { newFilter.options = { ...options }; }

      return {
        ...state,
        filter: newFilter
      }

    case SET_ACTIVE_COLUMN:
      return {
        ...state,
        table: {
          ...state.table,
          activeColumnIndex: action.payload.activeColumnIndex
        }
      }

    case TOGGLE_COLUMN_SORT_DIRECTION:
      return {
        ...state,
        table: {
          ...state.table,
          columns: [
            ...state.table.columns.slice(0, action.meta.columnIndex),
            { ...state.table.columns[action.meta.columnIndex], isInAscOrder: !state.table.columns[action.meta.columnIndex].isInAscOrder },
            ...state.table.columns.slice(action.meta.columnIndex + 1)
          ]
        }
      }

    default:
      return state;
  }
}

export default resultsReducer;