// @flow
export const KNIGHTS_TOUR_INIT_ENGINE = 'KNIGHTS_TOUR_INIT_ENGINE';
export const KNIGHTS_TOUR_RESET_ENGINE = 'KNIGHTS_TOUR_RESET_ENGINE';

export const initEngine = (visited:Array<boolean>, active:number) => ({
  type: KNIGHTS_TOUR_INIT_ENGINE,
  payload: {
    visited,
    active
  }
});

export const resetEngine = () => ({
  type: KNIGHTS_TOUR_RESET_ENGINE
});