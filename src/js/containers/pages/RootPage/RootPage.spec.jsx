import React from 'react';
import { shallow } from 'enzyme';

import { createNewStore } from 'js/store';
import RootPage from './RootPage';

describe('RootPage component', () => {

  let store, getDefaultProps;

  beforeAll(() => {
    store = createNewStore();
    getDefaultProps = () => ({
      dispatch: store.dispatch,
      api: {
        clientUser: {
          res: {
            status: 200,
            data: { username: 'Karmello' }
          }
        },
        gameCategories: {
          req: { isAwaiting: false },
          res: { status: 200 }
        },
        games: {
          req: { isAwaiting: false },
          res: { status: 200 }
        }
      },
      app: { authStatus: 'logged_in' },
      pages: { gamesPage: { category: 'chess' } }
    });
  });

  it('should shallow render and unmount', () => {
    const wrapper = shallow(<RootPage.WrappedComponent {...getDefaultProps()} />);
    wrapper.unmount();
  });

  it('should shallow render', () => {
    const props = getDefaultProps();
    props.api.gameCategories.req.isAwaiting = true;
    props.api.gameCategories.res.status = 400;
    props.api.games.req.isAwaiting = true;
    props.api.games.res.status = 400;
    shallow(<RootPage.WrappedComponent {...props} />);
  });
});
