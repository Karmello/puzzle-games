import store from 'js/store';
import { clientUserRes, gameCategoriesRes, gamesRes } from '__tests__/__mocks__/apiResponses';
import { renderWrapper } from '__tests__/__helpers__/routeTestHelpers';


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
    state.app.authStatus = 'unknown';
    const wrapper = renderWrapper(['/'], 0);
    expect(wrapper.find('.AppBar').length).toBe(0);
    expect(wrapper.find('[pathname="/auth"]').length).toBe(1);
  });

  it('should redirect', () => {
    state.app.authStatus = 'not_authorized';
    const wrapper = renderWrapper(['/'], 0);
    expect(wrapper.find('.AppBar').length).toBe(0);
    expect(wrapper.find('[pathname="/auth"]').length).toBe(1);
  });

  it('should render PageError', () => {
    state.api.gameCategories.res = {};
    state.app.authStatus = 'connected';
    const wrapper = renderWrapper(['/'], 0);
    expect(wrapper.find('.AppBar').length).toBe(1);
    expect(wrapper.find('.AppDrawer').length).toBe(1);
    expect(wrapper.find('.MySnackBar').length).toBe(1);
    expect(wrapper.find('.PageError').length).toBe(1);
  });

  it('should render root components', () => {
    state.app.authStatus = 'connected';
    const wrapper = renderWrapper(['/'], 0);
    expect(wrapper.find('.AppBar').length).toBe(1);
    expect(wrapper.find('.AppDrawer').length).toBe(1);
    expect(wrapper.find('.MySnackBar').length).toBe(1);
  });
});