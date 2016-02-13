//var React = require('react');
//var ReactDOM = require('react-dom');
// import React from 'react';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import appointmentsApp from './reducers'

let store = createStore(appointmentsApp)


// import { combineReducers } from 'redux';
// import getNewsMiddleware from './middlewares/getNewsMiddleware';
import Appointments from './components/appointments';


console.log("Webpack works GGGGGGGGGGGGGGGGGGGGGreat!");


ReactDOM.render(<Appointments />, document.getElementById('reactroot'));


console.log("Webpack worked so nice!");
