// @flow
export const GAME_PAGE_TOGGLE_EXPANSION_PANEL = 'GAME_PAGE_TOGGLE_EXPANSION_PANEL';
export const GAME_PAGE_CLEAR = 'GAME_PAGE_CLEAR';

export const toggleExpansionPanel = (name:string, expanded:boolean) => ({
  type: GAME_PAGE_TOGGLE_EXPANSION_PANEL,
  meta: { name },
  payload: { expanded }
});