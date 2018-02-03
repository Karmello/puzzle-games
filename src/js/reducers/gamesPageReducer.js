import { SWITCH_GAME_CATEGORY_TAB, CHANGE_GAME_OPTIONS } from 'js/actions/gamesPage';

const initialState = {
  category: 'sliding',
  options: {
    BossPuzzle: { mode: 'IMG', dimension: '3' },
    EightQueens: {}
  }
};

const gamesPageReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case SWITCH_GAME_CATEGORY_TAB:
      return {
        ...state,
        category: action.payload.category
      }

    case CHANGE_GAME_OPTIONS:
      return {
        ...state,
        options: {
          ...state,
          [action.meta.id]: {
            ...action.payload.options
          }
        }
      }

    default:
      return state;
  }
}

export default gamesPageReducer;