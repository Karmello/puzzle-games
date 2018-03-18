import { coordsToIndex, indexToCoords, offsetToIndex, findAllMovementCoords } from 'js/game/GridGameBoard/GridGameBoard.logic';


describe('Game logic methods', () => {

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
});