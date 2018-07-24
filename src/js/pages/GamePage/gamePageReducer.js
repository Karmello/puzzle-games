import { TOGGLE_EXPANSION_PANEL, GAME_PAGE_CLEAR } from 'js/pages/GamePage/gamePageActions';

const initialState = {
  infoExpanded: false,
  bestScoreExpanded: false
};

const gamePageReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case TOGGLE_EXPANSION_PANEL:
      return {
        ...state,
        [action.meta.name + 'Expanded']: action.payload.expanded
      }

    case GAME_PAGE_CLEAR:
      return initialState;

    default:
      return state;
  }
}

export default gamePageReducer;