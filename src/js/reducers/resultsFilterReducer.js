import { CHANGE_RESULTS_FILTER } from 'js/actions/resultsFilter';

const initialState = {
  gameId: 'BossPuzzle',
  dimension: 3,
  style: 'IMG'
};

const resultsReducer = (state = initialState, action) => {

  switch (action.type) {

    case CHANGE_RESULTS_FILTER:
      return { ...action.payload }

    default:
      return state;
  }
}

export default resultsReducer;