// @flow
import type { T_GameOptionsModel } from 'js/flow-types';

export const GAME_START = 'GAME_START';
export const GAME_STOP_LOADER = 'GAME_STOP_LOADER';
export const GAME_MAKE_MOVE = 'GAME_MAKE_MOVE';
export const GAME_SET_AS_SOLVED = 'GAME_SET_AS_SOLVED';
export const GAME_END = 'GAME_END';

export const startGame = (id:string, options:T_GameOptionsModel, doRestart:boolean) => ({
  type: GAME_START,
  payload: { id, options, doRestart }
});

export const stopGameLoader = () => ({
  type: GAME_STOP_LOADER
});

export const makeMove = () => ({
  type: GAME_MAKE_MOVE
});

export const setAsSolved = () => ({
  type: GAME_SET_AS_SOLVED
});

export const endGame = () => ({
  type: GAME_END
});