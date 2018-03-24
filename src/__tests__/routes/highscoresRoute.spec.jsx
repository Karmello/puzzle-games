import store from 'js/store';
import { clientUserRes, gameCategoriesRes, gamesRes } from '__tests__/__mocks__/apiResponses';
import { renderWrapper } from '__tests__/__helpers__/routeTestHelpers';


describe('/highscores', () => {

  let state;

  beforeAll(() => {
    
    state = store.getState();
    
    state.api.clientUser.res = clientUserRes;
    state.api.gameCategories.res = gameCategoriesRes;
    state.api.games.res = gamesRes;
    
    state.pages.highscoresPage = {
      gameFilter: { id: 'boss-puzzle', category: 'sliding' },
      optionsFilter: { mode: 'NUM', dimension: '3' }
    }

    localStorage.setItem('ui', JSON.stringify({
      [clientUserRes.data.username]: {
        highscoresPage: {
          gameFilter: { id: 'boss-puzzle', category: 'sliding' },
          optionsFilter: { mode: 'NUM', dimension: '3' }
        }
      }
    }));
  });

  it('should redirect', () => {
    state.app.authStatus = '';
    const wrapper = renderWrapper(['/highscores/boss-puzzle'], 0);
    expect(wrapper.find('.AppBar').length).toBe(0);
    expect(wrapper.find('[pathname="/auth"]').length).toBe(1);
  });

  it('should redirect', () => {
    state.app.authStatus = 'logged_in';
    const wrapper = renderWrapper(['/highscores/boss-puzzle'], 0);
    expect(wrapper.find('.HighscoresPage').length).toBe(0);
    expect(wrapper.find('[pathname="/highscores/boss-puzzle"]').length).toBe(1);
    expect(wrapper.find('[search="dimension=3&mode=NUM"]').length).toBe(1);
  });

  it('should redirect', () => {

    state.app.authStatus = 'logged_in';
    
    const wrapper = renderWrapper([{
      pathname: '/highscores/boss-puzzle',
      search: ''
    }], 0);
    
    expect(wrapper.find('.HighscoresPage').length).toBe(0);
    expect(wrapper.find('[pathname="/highscores/boss-puzzle"]').length).toBe(1);
    expect(wrapper.find('[search="dimension=3&mode=NUM"]').length).toBe(1);
  });

  it('should render HighscoresPage', () => {
    
    state.app.authStatus = 'logged_in';
    
    const wrapper = renderWrapper([{
      pathname: '/highscores/boss-puzzle',
      search: 'mode=NUM&dimension=3'
    }], 0);
    
    expect(wrapper.find('.HighscoresPage').length).toBe(1);
  });
});