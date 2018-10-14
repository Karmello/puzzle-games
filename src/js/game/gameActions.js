// @flow

import type { T_GameOptions } from 'js/gameOptions';

export const START_GAME = 'START_GAME';
export const STOP_GAME_LOADER = 'STOP_GAME_LOADER';
export const MAKE_MOVE = 'MAKE_MOVE';
export const SET_AS_SOLVED = 'SET_AS_SOLVED';
export const END_GAME = 'END_GAME';

export const startGame = (id:string, options:T_GameOptions, doRestart:boolean) => ({
  type: START_GAME,
  payload: { id, options, doRestart }
});

export const stopGameLoader = () => ({
  type: STOP_GAME_LOADER
});

export const makeMove = () => ({
  type: MAKE_MOVE
});

export const setAsSolved = () => ({
  type: SET_AS_SOLVED
});

export const endGame = () => ({
  type: END_GAME
});