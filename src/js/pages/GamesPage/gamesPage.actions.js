export const SWITCH_GAME_CATEGORY_TAB = 'SWITCH_GAME_CATEGORY_TAB';
export const CHANGE_GAME_OPTIONS = 'CHANGE_GAME_OPTIONS';

export const switchGameCategoryTab = (category) => ({
  type: SWITCH_GAME_CATEGORY_TAB,
  payload: { category }
});

export const changeGameOptions = (id, options) => ({
  type: CHANGE_GAME_OPTIONS,
  meta: { id },
  payload: { options }
});