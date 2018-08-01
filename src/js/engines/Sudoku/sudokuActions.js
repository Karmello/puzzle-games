// @flow

export const INIT_FRAME = 'INIT_FRAME';
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const RESET_FRAME = 'RESET_FRAME';

export const initFrame = (values:Array<number|null>) => ({
  type: INIT_FRAME,
  payload: {
    values
  }
});

export const changeValue = (index:number, newValue:number) => ({
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