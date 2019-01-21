import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import store from 'js/store';
import { App } from 'js/containers';

import './index.css';

const render = () => (
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <AppContainer>
          <App/>
        </AppContainer>
      </Router>
    </Provider>, document.getElementById('root')
  )
);

render(App);

if ((module:{ hot:boolean }).hot) {
  (module:{ hot:boolean }).hot.accept([
    'js/containers/app/App/App',
    'js/containers',
    'js/components'
  ], () => render(require('js/containers/app/App/App')));
}