import { combineReducers } from 'redux';

import appReducer from 'js/reducers/appReducer';
import getApiRequestReducer from 'js/reducers/apiRequestReducer';
import gamesPageReducer from 'js/reducers/gamesPageReducer';
import gameReducer from 'js/reducers/gameReducer';
import bossPuzzleReducer from 'js/reducers/bossPuzzleReducer';
import gameOptionsReducer from 'js/reducers/gameOptionsReducer';
import resultsFilterReducer from 'js/reducers/resultsFilterReducer';

import {
  FETCH_OR_CREATE_CLIENT_USER,
  FETCH_ALL_USERS,
  FETCH_ALL_GAMES,
  FETCH_GAME_CATEGORIES,
  FETCH_RESULTS,
  SAVE_NEW_RESULT
} from 'js/actions/api';


const reducers = combineReducers({
  api: combineReducers({
    clientUser: getApiRequestReducer(FETCH_OR_CREATE_CLIENT_USER),
    allUsers: getApiRequestReducer(FETCH_ALL_USERS),
    allGames: getApiRequestReducer(FETCH_ALL_GAMES),
    gameCategories: getApiRequestReducer(FETCH_GAME_CATEGORIES),
    results: getApiRequestReducer(FETCH_RESULTS),
    newResult: getApiRequestReducer(SAVE_NEW_RESULT)
  }),
  app: appReducer,
  pages: combineReducers({
    gamesPage: gamesPageReducer
  }),
  game: gameReducer,
  engines: combineReducers({
    BossPuzzle: bossPuzzleReducer
  }),
  gameOptions: gameOptionsReducer,
  resultsFilter: resultsFilterReducer
});

export default reducers;