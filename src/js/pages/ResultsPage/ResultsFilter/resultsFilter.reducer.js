import { CHANGE_RESULTS_FILTER } from './../resultsPage.actions';

const initialState = {
  game: { category: 'sliding', id: 'BossPuzzle' },
  options: { mode: 'NUM', dimension: '3' }
};

const resultsFilterReducer = (state = initialState, action) => {

  switch (action.type) {

    case CHANGE_RESULTS_FILTER:
  
      const { category, id, options } = action.payload;
      const newState = { ...state };

      if (category) { newState.game.category = category; }
      if (id) { newState.game.id = id; }
      if (options) { newState.options = { ...options }; }

      return newState;

    default:
      return state;
  }
}

export default resultsFilterReducer;