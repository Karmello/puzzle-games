// @flow

import type { GameOptions } from 'types/store';

export const SWITCH_GAME_CATEGORY_TAB = 'SWITCH_GAME_CATEGORY_TAB';
export const CHANGE_GAME_OPTIONS = 'CHANGE_GAME_OPTIONS';
export const GAMES_PAGE_CLEAR = 'GAMES_PAGE_CLEAR';

export const switchGameCategoryTab = (category:string) => ({
  type: SWITCH_GAME_CATEGORY_TAB,
  payload: { category }
});

export const changeGameOptions = (id:string, options:GameOptions) => ({
  type: CHANGE_GAME_OPTIONS,
  meta: { id },
  payload: { options }
});