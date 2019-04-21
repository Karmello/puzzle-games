import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import store from 'js/store';
import { App } from 'js/containers';

import * as serviceWorker from './serviceWorker';
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

if (module.hot) {
  module.hot.accept([
    'js/containers/app/App/App',
    'js/containers',
    'js/components'
  ], () => render(require('js/containers/app/App/App')));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();