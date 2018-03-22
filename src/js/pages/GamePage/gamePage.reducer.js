import { TOGGLE_EXPANSION_PANEL } from 'js/pages/GamePage/gamePage.actions';

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

    default:
      return state;
  }
}

export default gamePageReducer;