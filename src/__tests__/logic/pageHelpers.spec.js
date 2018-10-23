import * as helpers from 'js/extracts/pages';
import { gameCategoriesRes, gamesRes } from '__tests__/__mocks__/apiResponses';


describe('page helpers', () => {
  
  const context = {
    props: {
      api: {
        gameCategories: { res: gameCategoriesRes },
        games: { res: gamesRes }
      }
    }
  };

  it('should validate game params', () => {
    
    const params = { category: 'sliding', id: 'boss-puzzle' };
    const options = { mode: 'NUM', dimension: '3' };
    const result = helpers.validateGameParams.call(context, params, options);

    expect(result).toEqual({
      shouldRedirect: false,
      validQueryParams: { mode: 'NUM', dimension: '3' },
      gameData: gamesRes.data[0]
    });
  });

  it('should validate game params', () => {
    
    const params = { category: 'sliding', id: 'boss-puzzle' };
    const options = { mode: 'IMG' };
    const result = helpers.validateGameParams.call(context, params, options);

    expect(result).toEqual({
      shouldRedirect: true,
      validQueryParams: { mode: 'IMG', dimension: '3' },
      gameData: gamesRes.data[0]
    });
  });

  it('should validate game params', () => {
    
    const params = { category: 'sliding', id: 'boss-puzzle' };
    const options = { mode: 'IMG', dimension: '5', x: 100 };
    const result = helpers.validateGameParams.call(context, params, options);

    expect(result).toEqual({
      shouldRedirect: true,
      validQueryParams: { mode: 'IMG', dimension: '5' },
      gameData: gamesRes.data[0]
    });
  });

  it('should validate game params', () => {
    
    const params = { category: 'abc', id: 'abc' };
    const options = { mode: 'IMG', dimension: '5', x: 100 };
    const result = helpers.validateGameParams.call(context, params, options);

    expect(result).toEqual({
      shouldRedirect: true
    });
  });
});