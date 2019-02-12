// @flow
export const TETRIS_INIT_ENGINE = 'TETRIS_INIT_ENGINE';
export const TETRIS_RESET_ENGINE = 'TETRIS_RESET_ENGINE';

export const initEngine = (blocks:Array<boolean|null>) => ({
  type: TETRIS_INIT_ENGINE,
  payload: {
    blocks
  }
});

export const resetEngine = () => ({
  type: TETRIS_RESET_ENGINE
});