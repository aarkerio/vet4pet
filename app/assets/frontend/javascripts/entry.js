'use strict';

import 'babel-polyfill';

import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './containers/App';
import ApposComponent from './containers/Appos_Ctnr';
import AppoModal from './components/AppoModal';

import configureStore from './configureStore';

const my_store = configureStore();

const synchistory = syncHistoryWithStore(browserHistory, my_store);

render(
  <Provider store={my_store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={synchistory}>
      <Route path="/" handler={App} component={App}>
        <Route path="/appointments" component={ApposComponent}/>
        <Route path="/appointments/:appoId" component={AppoModal}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('reactroot')
);
