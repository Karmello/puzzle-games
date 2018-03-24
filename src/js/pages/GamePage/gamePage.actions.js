export const TOGGLE_EXPANSION_PANEL = 'TOGGLE_EXPANSION_PANEL';
export const GAME_PAGE_CLEAR = 'GAME_PAGE_CLEAR';

export const toggleExpansionPanel = (name, expanded) => ({
  type: TOGGLE_EXPANSION_PANEL,
  meta: { name },
  payload: { expanded }
});