import { CHANGE_RESULTS_FILTER } from 'js/actions/resultsPage';

const initialState = {
  filter: {
    game: { category: 'sliding', id: 'BossPuzzle' },
    options: { mode: 'NUM', dimension: '3' }
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

    default:
      return state;
  }
}

export default resultsReducer;