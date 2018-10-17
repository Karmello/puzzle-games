// @flow
import type { T_GameOptionsModel } from 'js/api';

// components
export { default as Game } from './Game/Game';
export { default as GameBtn } from './GameBtn/GameBtn';
export { default as GameMenu } from './GameMenu/GameMenu';
export { default as GridGameBoard } from './GridGameBoard/GridGameBoard';

// flow types
export type T_GameSettings = {
  id:string,
  options:T_GameOptionsModel,
  moves:number,
  isSolved:boolean,
  isLoading:boolean,
  doRestart:boolean
};