import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from 'js/store';
import { App } from 'js/containers';

import './index.css';


ReactDOM.render(
	<Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>, document.getElementById('root')
);