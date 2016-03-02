import App from './containers/App';
import ApposComponent from './containers/Appos_Ctnr';
import AppoModal from './components/AppoModal';
import { render } from 'react-dom';
import React from 'react'
import { Router, Route, DefaultRoute, RouteHandler, NoMatch, browserHistory, hashHistory } from 'react-router';

const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: ApposComponent },
    childRoutes: [
    //  { path: 'about', component: About },
      { path: 'appos',
        component: ApposComponent,
        childRoutes: [
          { path: '/appos/:id', component: AppoModal }
        ]
      }
    ]
  }
];


//render(<Router routes={routeConfig} history={hashHistory} />, document.getElementById('reactroot'))

export default routeConfig;