import { combineReducers } from 'redux';

import appReducer from 'js/reducers/appReducer';
import gameReducer from 'js/reducers/gameReducer';
import roundReducer from 'js/reducers/roundReducer';
import frameReducer from 'js/reducers/frameReducer';
import getApiRequestReducer from 'js/reducers/apiRequestReducer';


const reducers = combineReducers({
  app: appReducer,
  game: gameReducer,
  round: roundReducer,
  frame: frameReducer,
  api: combineReducers({
    me: getApiRequestReducer('USER')
  })
});

export default reducers;