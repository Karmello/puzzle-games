// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import getApiRequestReducer from 'js/creators/reducer/api';

import appReducer from 'js/reducers/app';
import gameReducer from 'js/reducers/game';

import gamesPageReducer from './gamesPage';
import gamePageReducer from './gamePage';
import highscoresPageReducer from './highscoresPage';

import bossPuzzleReducer from './bossPuzzle';
import eightQueensReducer from './eightQueens';
import sudokuReducer from './sudoku';

import {
  CLIENT_USER_ACTION,
  FETCH_USERS,
  FETCH_GAMES,
  FETCH_GAME_CATEGORIES,
  FETCH_HIGHSCORES,
  FETCH_HIGHSCORE,
  SAVE_NEW_HIGHSCORE
} from 'js/actions/api';

export default combineReducers({
  api: combineReducers({
    clientUser: getApiRequestReducer(CLIENT_USER_ACTION),
    users: getApiRequestReducer(FETCH_USERS),
    games: getApiRequestReducer(FETCH_GAMES),
    gameCategories: getApiRequestReducer(FETCH_GAME_CATEGORIES),
    highscores: getApiRequestReducer(FETCH_HIGHSCORES),
    bestHighscore: getApiRequestReducer(FETCH_HIGHSCORE),
    newHighscore: getApiRequestReducer(SAVE_NEW_HIGHSCORE)
  }),
  app: appReducer,
  pages: combineReducers({
    gamesPage: gamesPageReducer,
    gamePage: gamePageReducer,
    highscoresPage: highscoresPageReducer
  }),
  game: gameReducer,
  engines: combineReducers({
    'boss-puzzle': bossPuzzleReducer,
    'eight-queens': eightQueensReducer,
    'sudoku': sudokuReducer
  }),
  form: formReducer
});