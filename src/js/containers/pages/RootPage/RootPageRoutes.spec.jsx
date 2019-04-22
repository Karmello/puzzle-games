import store from 'js/store';
import { clientUserRes, gameCategoriesRes, gamesRes } from 'js/helpers/apiResponses';
import { renderWrapper } from 'js/helpers/methods';

describe('/', () => {

  let state;

  beforeAll(() => {
    state = store.getState();
    state.api.clientUser.res = clientUserRes;
    state.api.gameCategories.res = gameCategoriesRes;
    state.api.games.res = gamesRes;
  });

  it('should redirect', () => {
    state.app.authStatus = '';
    const wrapper = renderWrapper(['/'], 0);
    expect(wrapper.find('.AppBar').length).toBe(0);
    expect(wrapper.find('[pathname="/auth"]').length).toBe(1);
  });

  it('should redirect', () => {
    state.app.authStatus = 'logged_out';
    const wrapper = renderWrapper(['/'], 0);
    expect(wrapper.find('.AppBar').length).toBe(0);
    expect(wrapper.find('[pathname="/auth"]').length).toBe(1);
  });

  it('should redirect', () => {
    state.app.authStatus = 'logged_out';
    const wrapper = renderWrapper(['/'], 0);
    expect(wrapper.find('.AppBar').length).toBe(0);
    expect(wrapper.find('[pathname="/auth"]').length).toBe(1);
  });

  it('should render PageError', () => {
    state.api.gameCategories.req.isAwaiting = false;
    state.api.gameCategories.res.status = 400;
    state.app.authStatus = 'logged_in';
    const wrapper = renderWrapper(['/'], 0);
    expect(wrapper.find('.AppBar').length).toBe(1);
    expect(wrapper.find('.AppDrawer').length).toBe(1);
    expect(wrapper.find('.MySnackBar').length).toBe(1);
    expect(wrapper.find('.PageError').length).toBe(1);
  });

  it('should render root components', () => {
    state.app.authStatus = 'logged_in';
    const wrapper = renderWrapper(['/'], 0);
    expect(wrapper.find('.AppBar').length).toBe(1);
    expect(wrapper.find('.AppDrawer').length).toBe(1);
    expect(wrapper.find('.MySnackBar').length).toBe(1);
  });
});
