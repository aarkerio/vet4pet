'use strict';

import 'babel-polyfill';

import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer, reduxRouteComponent } from 'react-router-redux';

import App from './containers/App';
import ApposComponent from './containers/Appos_Ctnr';
import AppoModal from './components/AppoModal';

import configureStore from './configureStore';

const my_store = configureStore();

const synchistory = syncHistoryWithStore(browserHistory, my_store);

render(
    <Provider store={my_store}>
    <div>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={synchistory}>
      <Route name="app" path="/" handler={App} component={App}>
          <IndexRoute component={App}/>
          <Route path="/appointments/" component={ApposComponent}/>
          <Route path="/appointment/:appoId" component={AppoModal}/>
      </Route>
        </Router>
        </div>
  </Provider>,
  document.getElementById('reactroot')
);
