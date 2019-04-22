import { startingValues, checkIfSolved } from 'js/extracts/sudoku';

describe('Sudoku helpers', () => {

  describe('checkIfSolved', () => {

    let dimension;

    beforeAll(() => {
      dimension = Math.sqrt(startingValues.length);
    });

    it('should return true', done => {
      checkIfSolved(startingValues, dimension).then(isSolved => {
        expect(isSolved).toBeTruthy();
        done();
      });
    });

    it('should return false', done => {
      
      const temp = startingValues[1];
      startingValues[1] = startingValues[0];
      startingValues[0] = temp;
      
      checkIfSolved(startingValues, dimension).then(isSolved => {
        expect(isSolved).toBeFalsy();
        done();
      });
    });
  });
});
