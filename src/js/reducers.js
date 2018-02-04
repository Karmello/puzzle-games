import { combineReducers } from 'redux';

import getApiRequestReducer from 'js/api/api.reducerCreators';
import appReducer from 'js/app/app.reducer';
import gamesPageReducer from 'js/pages/GamesPage/gamesPage.reducer';
import gameReducer from 'js/pages/GamePage/game.reducer';
import bossPuzzleReducer from 'js/pages/GamePage/engines/BossPuzzle/bossPuzzle.reducer';
import eightQueensReducer from 'js/pages/GamePage/engines/EightQueens/eightQueens.reducer';
import resultsPageReducer from 'js/pages/ResultsPage/resultsPage.reducer';

import {
  FETCH_OR_CREATE_CLIENT_USER,
  FETCH_USERS,
  FETCH_GAMES,
  FETCH_GAME_CATEGORIES,
  FETCH_RESULTS,
  SAVE_NEW_RESULT
} from 'js/api/api.actions';


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