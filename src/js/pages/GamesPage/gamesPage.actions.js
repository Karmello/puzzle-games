export const SWITCH_GAME_CATEGORY_TAB = 'SWITCH_GAME_CATEGORY_TAB';
export const CHANGE_GAME_OPTIONS = 'CHANGE_GAME_OPTIONS';

export const switchGameCategoryTab = (newCategory) => {
  return {
    type: SWITCH_GAME_CATEGORY_TAB,
    payload: {
      category: newCategory
    }
  }
}

export const changeGameOptions = (id, options) => {
  return {
    type: CHANGE_GAME_OPTIONS,
    meta: {
      id: id
    },
    payload: {
      options: options
    }
  }
}