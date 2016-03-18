'use strict';

import 'babel-polyfill';

import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App';
import ApposContainer from './containers/ApposContainer';
import AppoModal from './components/AppoModal';

import configureStore from './configureStore';

const my_store = configureStore();
const history  = syncHistoryWithStore(browserHistory, my_store);

render(
    <Provider store={my_store}>
    <div>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
        <Route name="app" path="/groups/start" component={App} />
        <Route path="/appointments" component={ApposComponent}>
          <Route path="/appointment/:id" component={AppoModal} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('reactroot')
);
