import { combineReducers } from 'redux';

// app, api
import appReducer from 'js/reducers/appReducer';
import getApiRequestReducer from 'js/reducers/apiRequestReducer';

// pages
import gamesPageReducer from 'js/reducers/gamesPageReducer';
import resultsPageReducer from 'js/reducers/resultsPageReducer';

// games
import gameReducer from 'js/reducers/gameReducer';
import bossPuzzleReducer from 'js/reducers/bossPuzzleReducer';
import eightQueensReducer from 'js/reducers/eightQueensReducer';

import {
  FETCH_OR_CREATE_CLIENT_USER,
  FETCH_USERS,
  FETCH_GAMES,
  FETCH_GAME_CATEGORIES,
  FETCH_RESULTS,
  SAVE_NEW_RESULT
} from 'js/actions/api';


const reducers = combineReducers({
  api: combineReducers({
    clientUser: getApiRequestReducer(FETCH_OR_CREATE_CLIENT_USER),
    users: getApiRequestReducer(FETCH_USERS),
    games: getApiRequestReducer(FETCH_GAMES),
    gameCategories: getApiRequestReducer(FETCH_GAME_CATEGORIES),
    results: getApiRequestReducer(FETCH_RESULTS),
    newResult: getApiRequestReducer(SAVE_NEW_RESULT)
  }),
  app: appReducer,
  pages: combineReducers({
    gamesPage: gamesPageReducer,
    resultsPage: resultsPageReducer
  }),
  game: gameReducer,
  engines: combineReducers({
    BossPuzzle: bossPuzzleReducer,
    EightQueens: eightQueensReducer
  })
});

export default reducers;