import { INIT_FRAME, RESET_FRAME } from './eightQueens.actions';

const initialState = {
  queens: []
};

const eightQueensReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case INIT_FRAME:
      return {
        ...state,
        queens: action.payload.queens
      }

    case RESET_FRAME:
      return initialState;

    default:
      return state;
  }
}

export default eightQueensReducer;