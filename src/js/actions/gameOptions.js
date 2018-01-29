export const CHANGE_GAME_OPTIONS = 'CHANGE_GAME_OPTIONS';

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