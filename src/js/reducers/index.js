import { combineReducers } from 'redux';

import appReducer from 'js/reducers/appReducer';
import getApiRequestReducer from 'js/reducers/apiRequestReducer';
import gameListReducer from 'js/reducers/gameListReducer';
import gameReducer from 'js/reducers/gameReducer';
import bossPuzzleReducer from 'js/reducers/bossPuzzleReducer';


const reducers = combineReducers({
  api: combineReducers({
    user: getApiRequestReducer('USER'),
    games: getApiRequestReducer('GAMES')
  }),
  app: appReducer,
  game: gameReducer,
  gameList: gameListReducer,
  engines: combineReducers({
    BOSS_PUZZLE: bossPuzzleReducer
  })
});

export default reducers;