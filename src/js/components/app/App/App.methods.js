import { getUser, postUser, setAuthStatus, toggleAppLoader } from 'js/actions';
import { apiRequestClear } from 'js/actionCreators';


export function onDoneTryLogin(res) {

  const done = (status) => this.props.dispatch(setAuthStatus(status));

  new Promise((resolve, reject) => {
    if (res.status === 'connected') {
      window.FB.api('/me', me => {
        if (!me.error) {
          this.props.dispatch(getUser(`fb.id=${me.id}`)).then(() => {
            if (this.props.api.user.status === 200) {
              if (this.props.api.user.status === 404) {
                this.props.dispatch(postUser({ fb: me })).then(() => {
                  if (this.props.api.user.status === 200) { resolve('connected'); } else { reject('error'); }
                });
              } else { resolve('connected'); }
            } else { reject('error'); }
          });
        } else { reject('error'); }
      });
    } else { resolve(res.status); }
  }).then(done, done);
}

export function onLogout() {

  const { dispatch } = this.props;
  
  dispatch(toggleAppLoader(true));
  
  window.FB.logout(res => {
    dispatch(apiRequestClear('USER'));
    dispatch(setAuthStatus(res.status));
  });
}