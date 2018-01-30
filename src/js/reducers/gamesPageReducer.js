import { SWITCH_GAME_CATEGORY_TAB } from 'js/actions/gamesPage';

const initialState = {
  category: 'sliding'
};

const gamesPageReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case SWITCH_GAME_CATEGORY_TAB:
      return {
        ...state,
        category: action.payload.category
      }

    default:
      return state;
  }
}

export default gamesPageReducer;