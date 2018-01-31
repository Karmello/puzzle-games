import { CHANGE_RESULTS_FILTER } from 'js/actions/resultsPage';

const initialState = {
  filter: {
    game: { category: 'sliding', id: 'BossPuzzle' },
    options: { dimension: 3, style: 'IMG' }
  }
};

const resultsReducer = (state = initialState, action) => {

  switch (action.type) {

    case CHANGE_RESULTS_FILTER:
      return {
        ...state,
        filter: { ...action.payload.filter }
      }

    default:
      return state;
  }
}

export default resultsReducer;