import { getNewImgNumbers, initData } from 'js/extracts/bossPuzzle';


describe('BossPuzzle static methods', () => {

  describe('initData', () => {
  
    const getExpectations = (args, data, done) => {
      
      expect(data.tiles).toHaveLength(args.dimension ** 2);
      expect(data.tiles).toEqual(expect.arrayContaining(Array.from({ length: args.dimension ** 2 }, (value, key) => key + 1)));
      for (const i in data.tiles) { expect(data.tiles[i]).not.toEqual(i + 1); }
      
      expect(data.hiddenTileCoords).toHaveProperty('x');
      expect(data.hiddenTileCoords).toHaveProperty('y');
      expect(data.hiddenTileCoords.x).toBeGreaterThanOrEqual(0);
      expect(data.hiddenTileCoords.y).toBeGreaterThanOrEqual(0);
      expect(data.hiddenTileCoords.x).toBeLessThanOrEqual(args.dimension - 1);
      expect(data.hiddenTileCoords.y).toBeLessThanOrEqual(args.dimension - 1);
      done();
    }

    it('should throw an error', () => {
      const args = { dimension: '1', hiddenTileCoords: { x: 0, y: 0 } };
      expect(() => initData(args)).toThrow(new Error('Dimension must be greater than or equal 2'));
    });

    it('should initialize data', done => {
      const args = { dimension: '3', hiddenTileCoords: { x: 0, y: 0 } };
      const promise = initData(args);
      promise.then(data => { getExpectations(args, data, done); });
    });

    it('should initialize data', done => {
      const args = { dimension: '4', hiddenTileCoords: { x: 1, y: 1 } };
      const promise = initData(args);
      promise.then(data => { getExpectations(args, data, done); });
    });

    it('should initialize data', done => {
      const args = { dimension: '5', hiddenTileCoords: { x: 2, y: 2 } };
      const promise = initData(args);
      promise.then(data => { getExpectations(args, data, done); });
    });
  });

  describe('getNewImgNumbers', () => {
    
    it('should return numbers array', () => {
      const numbers = getNewImgNumbers([], 5);
      expect(numbers).toHaveLength(5);
      expect(numbers).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
    });
    
    it('should return numbers array', () => {
      const numbers = getNewImgNumbers([2, 3, 1], 3);
      expect(numbers).toHaveLength(3);
      expect(numbers).toEqual(expect.arrayContaining([1, 2, 3]));
      expect(numbers[0]).not.toBe(1);
    });
  });
});