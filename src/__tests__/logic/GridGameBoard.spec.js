import {
  coordsToIndex,
  indexToCoords,
  offsetToIndex,
  findAllMovementCoords,
  isAloneOnAxis,
  areValuesUniqueOnAxis,
  getFlipped,
  getRotated,
  getWithLinesShuffled
} from 'js/extracts/gridGameBoard';


describe('GridGameBoard logic methods', () => {

  describe('coordsToIndex', () => {
    it('should convert to index', () => {
      expect(coordsToIndex({ x: 0, y: 0 }, 3)).toEqual(0);
      expect(coordsToIndex({ x: 1, y: 2 }, 4)).toEqual(9);
      expect(coordsToIndex({ x: 4, y: 4 }, 5)).toEqual(24);
    });
  });

  describe('indexToCoords', () => {
    it('should convert to coords', () => {
      expect(indexToCoords(0, 3)).toEqual({ x: 0, y: 0 });
      expect(indexToCoords(9, 4)).toEqual({ x: 1, y: 2 });
      expect(indexToCoords(24, 5)).toEqual({ x: 4, y: 4 });
    });
  });

  describe('offsetToIndex', () => {
    it('should convert to index', () => {
      expect(offsetToIndex({ x: -50, y: 0 }, 100, 3)).toEqual(0);
      expect(offsetToIndex({ x: 0, y: -50 }, 100, 3)).toEqual(0);
      expect(offsetToIndex({ x: -50, y: -50 }, 100, 3)).toEqual(0);
      expect(offsetToIndex({ x: 0, y: 0 }, 100, 3)).toEqual(0);
      expect(offsetToIndex({ x: 49, y: 0 }, 100, 3)).toEqual(0);
      expect(offsetToIndex({ x: 0, y: 49 }, 100, 3)).toEqual(0);
      expect(offsetToIndex({ x: 49, y: 49 }, 100, 3)).toEqual(0);
      expect(offsetToIndex({ x: 50, y: 0 }, 100, 3)).toEqual(1);
      expect(offsetToIndex({ x: 50, y: 50 }, 100, 3)).toEqual(4);
      expect(offsetToIndex({ x: 200, y: 200 }, 100, 3)).toEqual(8);
      expect(offsetToIndex({ x: 249, y: 249 }, 100, 3)).toEqual(8);
    });
  });

  describe('offsetToIndex', () => {
    it('should return -1', () => {
      expect(offsetToIndex({ x: -123, y: 0 }, 100, 3)).toEqual(-1);
      expect(offsetToIndex({ x: -51, y: -51 }, 100, 3)).toEqual(-1);
      expect(offsetToIndex({ x: 0, y: 250 }, 100, 3)).toEqual(-1);
      expect(offsetToIndex({ x: 345, y: 345 }, 100, 3)).toEqual(-1);
    });
  });

  describe('findAllMovementCoords', () => {

    it('should throw an error', () => {
      expect(() => findAllMovementCoords({ x: 0, y: 0 }, '1')).toThrow(new Error('Dimension must be greater than or equal 2'));
    });

    it('should find coords', () => {
      expect(findAllMovementCoords({ x: 0, y: 0 }, '2')).toEqual([{ x: 1, y: 0 }, { x: 0, y: 1 }]);
      expect(findAllMovementCoords({ x: 0, y: 0 }, '3')).toEqual([{ x: 1, y: 0 }, { x: 0, y: 1 }]);
      expect(findAllMovementCoords({ x: 2, y: 0 }, '4')).toEqual([{ x: 3, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 0 }]);
      expect(findAllMovementCoords({ x: 1, y: 1 }, '5')).toEqual([{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }]);
    });
  });

  describe('isAloneOnAxis', () => {
    
    it('should return true', () => {
      expect(isAloneOnAxis('x', { x: 0, y: 0 }, 3, [1, 0, 0, 1, 1, 1, 1, 1, 1])).toEqual(true);
      expect(isAloneOnAxis('y', { x: 1, y: 1 }, 3, [1, 0, 1, 1, 1, 1, 1, 0, 1])).toEqual(true);
      expect(isAloneOnAxis('d1', { x: 2, y: 2 }, 3, [0, 1, 1, 1, 0, 1, 1, 1, 1])).toEqual(true);
      expect(isAloneOnAxis('d2', { x: 0, y: 2 }, 3, [1, 1, 0, 1, 0, 1, 1, 1, 1])).toEqual(true);
    });

    it('should return false', () => {
      expect(isAloneOnAxis('x', { x: 0, y: 0 }, 3, [1, 1, 0, 0, 0, 0, 0, 0, 0])).toEqual(false);
      expect(isAloneOnAxis('y', { x: 2, y: 0 }, 3, [0, 0, 1, 0, 0, 1, 0, 0, 0])).toEqual(false);
      expect(isAloneOnAxis('d1', { x: 1, y: 1 }, 3, [1, 0, 0, 0, 1, 0, 0, 0, 0])).toEqual(false);
      expect(isAloneOnAxis('d2', { x: 2, y: 1 }, 3, [0, 0, 0, 0, 0, 1, 0, 1, 0])).toEqual(false);
    });
  });

  describe('areValuesUniqueOnAxis', () => {

    const values = [
      1, 2, 3,
      1, 1, 1,
      1, 2, undefined
    ];

    it('should return true', () => {
      expect(areValuesUniqueOnAxis('X', 0, 3, values)).toEqual(true);
      expect(areValuesUniqueOnAxis('X', 2, 3, values)).toEqual(true);
      expect(areValuesUniqueOnAxis('Y', 2, 3, values)).toEqual(true);
    });

    it('should return false', () => {
      expect(areValuesUniqueOnAxis('X', 1, 3, values)).toEqual(false);
      expect(areValuesUniqueOnAxis('Y', 0, 3, values)).toEqual(false);
      expect(areValuesUniqueOnAxis('Y', 1, 3, values)).toEqual(false);
      expect(areValuesUniqueOnAxis('X', 2, 3, values, true)).toEqual(false);
    });
  });

  describe('getFlipped', () => {

    const values = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9
    ];

    it('should return flipped values', () => {
      expect(getFlipped('H', 3, values)).toEqual([7, 8, 9, 4, 5, 6, 1, 2, 3]);
      expect(getFlipped('V', 3, values)).toEqual([3, 2, 1, 6, 5, 4, 9, 8, 7]);
    });

    it('should return false', () => {
      expect(getFlipped('', 3, values)).toEqual(false);
    });
  });

  describe('getRotated', () => {

    const values = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9
    ];

    it('should return rotated values', () => {
      expect(getRotated('R', 90, 3, values)).toEqual([7, 4, 1, 8, 5, 2, 9, 6, 3]);
      expect(getRotated('L', 180, 3, values)).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1]);
      expect(getRotated('R', 270, 3, values)).toEqual([3, 6, 9, 2, 5, 8, 1, 4, 7]);
      expect(getRotated('L', 360, 3, values)).toEqual(values);
    });

    it('should return false', () => {
      expect(getRotated('', 90, 3, values)).toEqual(false);
    });
  });

  describe('getWithLinesShuffled', () => {

    const values = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9
    ];

    it('should return values with lines shuffled', () => {
      expect(getWithLinesShuffled('H', 0, 1, 3, values)).toEqual([4, 5, 6, 1, 2, 3, 7, 8, 9]);
      expect(getWithLinesShuffled('V', 1, 2, 3, values)).toEqual([1, 3, 2, 4, 6, 5, 7, 9, 8]);
    });

    it('should return false', () => {
      expect(getWithLinesShuffled('', 0, 1, 3, values)).toEqual(false);
    })
  });
});