import { combineReducers } from 'redux';

import appReducer from 'js/reducers/appReducer';
import getApiRequestReducer from 'js/reducers/apiRequestReducer';
import gameOptionsReducer from 'js/reducers/gameOptionsReducer';
import gameReducer from 'js/reducers/gameReducer';
import bossPuzzleReducer from 'js/reducers/bossPuzzleReducer';


const reducers = combineReducers({
  api: combineReducers({
    createdClientUser: getApiRequestReducer('CREATE_CLIENT_USER'),
    fetchedClientUser: getApiRequestReducer('FETCH_CLIENT_USER'),
    allUsers: getApiRequestReducer('FETCH_ALL_USERS'),
    allGames: getApiRequestReducer('FETCH_ALL_GAMES'),
    allResults: getApiRequestReducer('FETCH_ALL_RESULTS'),
    newResult: getApiRequestReducer('SAVE_NEW_RESULT')
  }),
  app: appReducer,
  gameOptions: gameOptionsReducer,
  game: gameReducer,
  engines: combineReducers({
    BossPuzzle: bossPuzzleReducer
  })
});

export default reducers;