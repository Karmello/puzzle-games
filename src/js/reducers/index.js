// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import getApiRequestReducer from 'js/creators/reducer/api';

import appReducer from './app';
import gamesPageReducer from './gamesPage';
import gamePageReducer from './gamePage';
import highscoresPageReducer from './highscoresPage';

import gameReducer from './game';
import bossPuzzleReducer from './bossPuzzle';
import eightQueensReducer from './eightQueens';
import knightsTourReducer from './knightsTour';
import sudokuReducer from './sudoku';

import gridBoardReducer from './gridBoard';

import {
  API_MAKE_AUTH_REQUEST,
  API_FETCH_USERS,
  API_FETCH_GAMES,
  API_FETCH_GAME_CATEGORIES,
  API_FETCH_HIGHSCORES,
  API_FETCH_HIGHSCORE,
  API_SAVE_NEW_HIGHSCORE
} from 'js/actions/api';

export default combineReducers({
  api: combineReducers({
    clientUser: getApiRequestReducer(API_MAKE_AUTH_REQUEST),
    users: getApiRequestReducer(API_FETCH_USERS),
    games: getApiRequestReducer(API_FETCH_GAMES),
    gameCategories: getApiRequestReducer(API_FETCH_GAME_CATEGORIES),
    highscores: getApiRequestReducer(API_FETCH_HIGHSCORES),
    bestHighscore: getApiRequestReducer(API_FETCH_HIGHSCORE),
    newHighscore: getApiRequestReducer(API_SAVE_NEW_HIGHSCORE)
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
    'knights-tour': knightsTourReducer,
    'sudoku': sudokuReducer
  }),
  gridBoard: gridBoardReducer,
  form: formReducer
});