import React from 'react';
import { shallow } from 'enzyme';

import { createNewStore } from 'js/store';
import AuthPage from './AuthPage';

describe('AuthPage component', () => {

  let store, getDefaultProps;

  beforeAll(() => {
    store = createNewStore();
    getDefaultProps = () => ({
      dispatch: store.dispatch,
      app: { authStatus: 'logged_in' },
      clientUser: { res: { status: 200 } },
      location: {}
    });
  });

  it('should shallow render and unmount', () => {
    const wrapper = shallow(<AuthPage.WrappedComponent {...getDefaultProps()} />);
    wrapper.unmount();
  });

  it('should shallow render', () => {
    const props = getDefaultProps();
    props.app.authStatus = 'logged_out';
    localStorage.setItem('token', '##########');
    shallow(<AuthPage.WrappedComponent {...props} />);
  });

  it('should shallow render', () => {
    const props = getDefaultProps();
    props.app.authStatus = '';
    localStorage.removeItem('token');
    shallow(<AuthPage.WrappedComponent {...props} />);
  });

  it('should shallow render', () => {
    const props = getDefaultProps();
    props.app.authStatus = 'logged_out';
    props.clientUser.res.status = 400;
    localStorage.setItem('token', '##########');
    shallow(<AuthPage.WrappedComponent {...props} />);
  });

  it('should shallow render and call a method', done => {
    const wrapper = shallow(<AuthPage.WrappedComponent {...getDefaultProps()} />);
    wrapper.instance().onAuthFormSubmit('login', {
      username: 'Karmello',
      password: 'password'
    });
    setTimeout(done, 3000);
  });

  it('should shallow render and call a method', done => {
    const props = getDefaultProps();
    props.clientUser.res.status = 400;
    props.clientUser.res.data = { errors: {} };
    const wrapper = shallow(<AuthPage.WrappedComponent {...props} />);
    wrapper.instance().onAuthFormSubmit('login', {
      username: 'Karmello',
      password: 'password'
    });
    setTimeout(done, 1000);
  });
});
