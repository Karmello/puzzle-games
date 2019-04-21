import knightsTourReducer from 'js/reducers/knightsTour';
import { initEngine, moveKnight, resetEngine } from 'js/actions/knightsTour';


describe('knightsTourReducer', () => {

  it('should return the initial state', () => {
    expect(knightsTourReducer(undefined, {})).toEqual({
      visited: [],
      active: -1
    });
  });

  it('should handle KNIGHTS_TOUR_INIT_ENGINE', () => {
    expect(knightsTourReducer({ queens: [] }, initEngine([true, true, false, false], 1))).toEqual({
      visited: [true, true, false, false],
      active: 1
    });
  });

  it('should handle KNIGHTS_TOUR_MOVE_KNIGHT', () => {
    expect(knightsTourReducer({
      visited: [true, true, false, false],
      active: 1
    }, moveKnight(2))).toEqual({
      visited: [true, true, true, false],
      active: 2
    });
  });

  it('should handle KNIGHTS_TOUR_RESET_ENGINE', () => {
    expect(knightsTourReducer({
      visited: [true, true, false, false],
      active: 1
    }, resetEngine())).toEqual({
      visited: [],
      active: -1
    });
  });
});
