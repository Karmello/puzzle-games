export const INIT_FRAME = 'INIT_FRAME';
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const RESET_FRAME = 'RESET_FRAME';

export const initFrame = values => ({
  type: INIT_FRAME,
  payload: {
    values
  }
});

export const changeValue = (index, newValue) => ({
  type: CHANGE_VALUE,
  meta: {
    index
  },
  payload: {
    newValue
  }
});

export const resetFrame = () => ({
  type: RESET_FRAME
});