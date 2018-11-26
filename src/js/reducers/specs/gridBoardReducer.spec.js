import gridBoardReducer from 'js/reducers/gridBoard';
import { initGridBoard, updateGridBoard, grabElement, selectElement, resetGridBoard } from 'js/actions/gridBoard';

describe('gridBoardReducer', () => {

  it('should return the initial state', () => {
    expect(gridBoardReducer(undefined, {})).toEqual({
      gridMap: {},
      grabbedIndex: -1
    });
  });

  describe('initGridBoard action', () => {

    it('should handle the action', () => {
      expect(gridBoardReducer(undefined, initGridBoard([true, true, true, false]))).toEqual({
        gridMap: {
          0: { isOccupied: true },
          1: { isOccupied: true },
          2: { isOccupied: true },
          3: { isOccupied: false }
        },
        grabbedIndex: -1
      });
    });

    it('should handle the action', () => {
      expect(gridBoardReducer(undefined, initGridBoard([true, true, true, false], true))).toEqual({
        gridMap: {
          0: { isOccupied: true, isSelected: false },
          1: { isOccupied: true, isSelected: false },
          2: { isOccupied: true, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1
      });
    });

    it('should handle the action', () => {
      expect(gridBoardReducer(undefined, initGridBoard([true, true, true, false], true, true))).toEqual({
        gridMap: {
          0: { isOccupied: true, isSelected: false },
          1: { isOccupied: true, isSelected: false },
          2: { isOccupied: true, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1
      });
    });

    it('should handle the action', () => {
      expect(gridBoardReducer(undefined, initGridBoard([true, true, true, false], undefined, true))).toEqual({
        gridMap: {
          0: { isOccupied: true },
          1: { isOccupied: true },
          2: { isOccupied: true },
          3: { isOccupied: false }
        },
        grabbedIndex: -1
      });
    });
  });

  describe('updateGridBoard action', () => {

    it('should handle the action', () => {
      expect(gridBoardReducer({
        gridMap: {
          0: { isOccupied: true },
          1: { isOccupied: false },
          2: { isOccupied: false },
          3: { isOccupied: false }
        },
        grabbedIndex: -1    
      }, updateGridBoard([true, true, true, false]))).toEqual({
        gridMap: {
          0: { isOccupied: true },
          1: { isOccupied: true },
          2: { isOccupied: true },
          3: { isOccupied: false }
        },
        grabbedIndex: -1
      });
    });

    it('should handle the action', () => {
      expect(gridBoardReducer({
        gridMap: {
          0: { isOccupied: true, isSelected: true },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: false, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1    
      }, updateGridBoard([false, true, false, false], true))).toEqual({
        gridMap: {
          0: { isOccupied: false, isSelected: false },
          1: { isOccupied: true, isSelected: true },
          2: { isOccupied: false, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1
      });
    });
  });

  describe('grabElement action', () => {

    it('should handle the action', () => {
      expect(gridBoardReducer({
        gridMap: {
          0: { isOccupied: false },
          1: { isOccupied: false },
          2: { isOccupied: true },
          3: { isOccupied: false }
        },
        grabbedIndex: -1    
      }, grabElement(2))).toEqual({
        gridMap: {
          0: { isOccupied: false },
          1: { isOccupied: false },
          2: { isOccupied: true },
          3: { isOccupied: false }
        },
        grabbedIndex: 2
      });
    });

    it('should handle the action', () => {
      expect(gridBoardReducer({
        gridMap: {
          0: { isOccupied: false },
          1: { isOccupied: false },
          2: { isOccupied: true },
          3: { isOccupied: false }
        },
        grabbedIndex: 2
      }, grabElement(0))).toEqual({
        gridMap: {
          0: { isOccupied: false },
          1: { isOccupied: false },
          2: { isOccupied: true },
          3: { isOccupied: false }
        },
        grabbedIndex: 2
      });
    });
  });

  describe('selectElement action', () => {

    it('should handle the action', () => {
      expect(gridBoardReducer({
        gridMap: {
          0: { isOccupied: true, isSelected: false },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: false, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1
      }, selectElement(1))).toEqual({
        gridMap: {
          0: { isOccupied: true, isSelected: false },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: false, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1
      });
    });

    it('should handle the action', () => {
      expect(gridBoardReducer({
        gridMap: {
          0: { isOccupied: true, isSelected: false },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: true, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1    
      }, selectElement(0))).toEqual({
        gridMap: {
          0: { isOccupied: true, isSelected: true },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: true, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1
      });
    });

    it('should handle the action', () => {
      expect(gridBoardReducer({
        gridMap: {
          0: { isOccupied: true, isSelected: true },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: true, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1    
      }, selectElement(2))).toEqual({
        gridMap: {
          0: { isOccupied: true, isSelected: false },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: true, isSelected: true },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1
      });
    });

    it('should handle the action', () => {
      expect(gridBoardReducer({
        gridMap: {
          0: { isOccupied: true, isSelected: true },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: true, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1    
      }, selectElement(2, true))).toEqual({
        gridMap: {
          0: { isOccupied: true, isSelected: true },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: true, isSelected: true },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: -1
      });
    });
  });

  describe('resetGridBoard action', () => {

    it('should handle the action', () => {
      expect(gridBoardReducer({
        gridMap: {
          0: { isOccupied: true, isSelected: true },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: false, isSelected: false },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: 0
      }, resetGridBoard())).toEqual({
        gridMap: {},
        grabbedIndex: -1
      });
    });

    it('should handle the action', () => {
      expect(gridBoardReducer({
        gridMap: {
          0: { isOccupied: true, isSelected: true },
          1: { isOccupied: false, isSelected: false },
          2: { isOccupied: true, isSelected: true },
          3: { isOccupied: false, isSelected: false }
        },
        grabbedIndex: 2
      }, resetGridBoard())).toEqual({
        gridMap: {},
        grabbedIndex: -1
      });
    });
  });
});