export const SWITCH_GAME_CATEGORY_TAB = 'SWITCH_GAME_CATEGORY_TAB';

export const switchGameCategoryTab = (newCategory) => {
  return {
    type: SWITCH_GAME_CATEGORY_TAB,
    payload: {
      category: newCategory
    }
  }
}