import store from 'js/store';
import { clientUserRes, gameCategoriesRes, gamesRes } from 'js/helpers/apiResponses';
import { renderWrapper } from 'js/helpers/methods';

describe('AuthPage', () => {

  describe('/auth', () => {

    let state;

    beforeAll(() => {
      state = store.getState();
      state.api.clientUser.res = clientUserRes;
      state.api.gameCategories.res = gameCategoriesRes;
      state.api.games.res = gamesRes;
    });

    it('should render AuthPage', () => {
      state.app.authStatus = '';
      const wrapper = renderWrapper(['/auth'], 0);
      expect(wrapper.find('.AuthPage').length).toBe(1);
    });

    it('should render AuthPage', () => {
      state.app.authStatus = 'logged_out';
      const wrapper = renderWrapper(['/auth'], 0);
      expect(wrapper.find('.AuthPage').length).toBe(1);
    });

    it('should redirect', () => {
      state.app.authStatus = 'logged_in';
      const wrapper = renderWrapper(['/auth'], 0);
      expect(wrapper.find('.AuthPage').length).toBe(0);
      expect(wrapper.find('[pathname="/games"]').length).toBe(1);
    });

    it('should redirect', () => {
      
      state.app.authStatus = 'logged_in';
      
      const wrapper = renderWrapper([{
        pathname: '/auth',
        state: {
          from: {
            pathname: '/games/chess',
            search: ''
          }
        }
      }], 0);
      
      expect(wrapper.find('.AuthPage').length).toBe(0);
      expect(wrapper.find('[pathname="/games/chess"]').length).toBe(1);
    });
  });
});