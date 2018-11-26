// @flow
import type { T_Coords } from 'js/flow-types';

export type T_BossPuzzleEngine = {
  imgNumbers:Array<number>,
  imgIndex:number,
  tiles:Array<number>,
  hiddenTileCoords:T_Coords
};

export type T_EightQueensEngine = {
  queens:Array<boolean>
};

export type T_KnightsTourEngine = {
  visited:Array<boolean>,
  active:number
};

export type T_SudokuEngine = {
  values:Array<number>
};