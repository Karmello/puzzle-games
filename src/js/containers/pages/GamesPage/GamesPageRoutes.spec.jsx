import { createNewStore } from 'js/store';
import { clientUserRes, gameCategoriesRes, gamesRes } from 'js/helpers/apiResponses';
import { renderWrapper } from 'js/helpers/methods';

describe('GamesPage', () => {

  describe('/games', () => {

    let store, state;

    beforeAll(() => {
      store = createNewStore();
      state = store.getState();
      state.api.clientUser.res = clientUserRes;
      state.api.gameCategories.res = gameCategoriesRes;
      state.api.games.res = gamesRes;
      state.pages.gamesPage.category = 'sliding';
    });

    it('should redirect', () => {
      state.app.authStatus = '';
      const wrapper = renderWrapper(['/games/sliding'], 0);
      expect(wrapper.find('.AppBar').length).toBe(0);
      expect(wrapper.find('[pathname="/auth"]').length).toBe(1);
    });

    it('should redirect', () => {
      state.app.authStatus = 'logged_in';
      const wrapper = renderWrapper(['/games/wrong_category'], 0);
      expect(wrapper.find('[pathname="/games/sliding"]').length).toBe(1);
    });

    it('should render GamesPage', () => {
      state.app.authStatus = 'logged_in';
      const wrapper = renderWrapper(['/games/sliding'], 0);
      expect(wrapper.find('.GamesPage').length).toBe(1);
    });

    it('should redirect', () => {
      state.app.authStatus = 'logged_in';
      const wrapper = renderWrapper(['/games/sliding/wrong_game_id'], 0);
      expect(wrapper.find('[pathname="/games/sliding"]').length).toBe(1);
    });

    it('should redirect', () => {
      state.app.authStatus = 'logged_in';
      const wrapper = renderWrapper(['/games/sliding/boss-puzzle'], 0);
      expect(wrapper.find('[pathname="/games/sliding/boss-puzzle"]').length).toBe(1);
      expect(wrapper.find('[search="dimension=3&mode=NUM"]').length).toBe(1);
    });

    it('should redirect', () => {
      state.app.authStatus = 'logged_in';
      const wrapper = renderWrapper(['/games/sliding/boss-puzzle?mode=ABC&dimension=-1'], 0);
      expect(wrapper.find('[pathname="/games/sliding/boss-puzzle"]').length).toBe(1);
      expect(wrapper.find('[search="dimension=3&mode=NUM"]').length).toBe(1);
    });

    it('should render GamePage', () => {
      state.app.authStatus = 'logged_in';
      const wrapper = renderWrapper(['/games/sliding/boss-puzzle?mode=NUM&dimension=3'], 0);
      expect(wrapper.find('.GamePage').length).toBe(1);
    });

    it('should render GamePage', () => {
      state.app.authStatus = 'logged_in';
      const wrapper = renderWrapper(['/games/sliding/boss-puzzle?mode=IMG&dimension=5'], 0);
      expect(wrapper.find('.GamePage').length).toBe(1);
    });
  });
});
