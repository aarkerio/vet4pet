
import React from 'react';
import ReactDOM from 'react-dom';
import ReactWidgets from 'react-widgets';
import Appointments from './components/appointments';

var _ = require('lodash');
_.times(3, function(i) {
  console.log(i);
});

console.log("Webpack works so nice!");

function main() {
    React.render(<Appointments />, document.getElementById('appointmentsdiv'));
}
