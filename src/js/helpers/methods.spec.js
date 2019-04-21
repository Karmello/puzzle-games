import * as methods from 'js/helpers/methods';

describe('helpers', () => {

  it('should shuffle an array', () => {
    const shuffled = methods.shuffleIntArray([1, 2, 3]);
    expect(shuffled).toHaveLength(3);
    expect(shuffled).toEqual(expect.arrayContaining([3, 2, 1]));
  });

  it('should shuffle an array', () => {
    const shuffled = methods.shuffleIntArray([1, 2, 3, 4, 5]);
    expect(shuffled).toHaveLength(5);
    expect(shuffled).toEqual(expect.arrayContaining([5, 4, 3, 2, 1]));
  });
});
