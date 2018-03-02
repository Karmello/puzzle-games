import * as methods from 'js/pages/page.methods';
import { gameCategoriesRes, gamesRes } from '__tests__/__mocks__/apiResponses';


describe('page methods', () => {
  
  const context = {
    props: {
      api: {
        gameCategories: { res: gameCategoriesRes },
        games: { res: gamesRes }
      }
    }
  };

  it('should validate game params', () => {
    
    const params = { category: 'sliding', id: 'BossPuzzle' };
    const options = { mode: 'NUM', dimension: '3' };
    const result = methods.validateGameParams.call(context, params, options);

    expect(result).toEqual({
      shouldRedirect: false,
      validParams: { mode: 'NUM', dimension: '3' },
      gameData: gamesRes.data[0]
    });
  });

  it('should validate game params', () => {
    
    const params = { category: 'sliding', id: 'BossPuzzle' };
    const options = { mode: 'IMG' };
    const result = methods.validateGameParams.call(context, params, options);

    expect(result).toEqual({
      shouldRedirect: true,
      validParams: { mode: 'IMG', dimension: '3' },
      gameData: gamesRes.data[0]
    });
  });

  it('should validate game params', () => {
    
    const params = { category: 'sliding', id: 'BossPuzzle' };
    const options = { mode: 'IMG', dimension: '5', x: 100 };
    const result = methods.validateGameParams.call(context, params, options);

    expect(result).toEqual({
      shouldRedirect: true,
      validParams: { mode: 'IMG', dimension: '5' },
      gameData: gamesRes.data[0]
    });
  });

  it('should validate game params', () => {
    
    const params = { category: 'abc', id: 'abc' };
    const options = { mode: 'IMG', dimension: '5', x: 100 };
    const result = methods.validateGameParams.call(context, params, options);

    expect(result).toEqual({
      shouldRedirect: true
    });
  });
});