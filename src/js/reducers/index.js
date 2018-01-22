import { combineReducers } from 'redux';

import appReducer from 'js/reducers/appReducer';
import getApiRequestReducer from 'js/reducers/apiRequestReducer';
import gameReducer from 'js/reducers/gameReducer';
import roundReducer from 'js/reducers/roundReducer';
import bossPuzzleReducer from 'js/reducers/bossPuzzleReducer';


const reducers = combineReducers({
  app: appReducer,
  api: combineReducers({
    me: getApiRequestReducer('USER')
  }),
  game: gameReducer,
  round: roundReducer,
  bossPuzzle: bossPuzzleReducer
});

export default reducers;