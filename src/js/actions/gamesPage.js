// @flow
import type { T_GameOptionsModel } from 'js/flow-types';

export const GAMES_PAGE_SWITCH_CATEGORY_TAB = 'GAMES_PAGE_SWITCH_CATEGORY_TAB';
export const GAMES_PAGE_CHANGE_GAME_OPTIONS = 'GAMES_PAGE_CHANGE_GAME_OPTIONS';
export const GAMES_PAGE_CLEAR = 'GAMES_PAGE_CLEAR';

export const switchGameCategoryTab = (category:string) => ({
  type: GAMES_PAGE_SWITCH_CATEGORY_TAB,
  payload: { category }
});

export const changeGameOptions = (id:string, options:T_GameOptionsModel) => ({
  type: GAMES_PAGE_CHANGE_GAME_OPTIONS,
  meta: { id },
  payload: { options }
});
