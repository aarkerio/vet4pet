'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
       <h1>App</h1>
       <p><a href='/appointments/'>Zu Ernennungs.</a></p>
       <p><Link to="/appointments/">Edit Ernennungs.</Link></p>
       <div><button onClick={() => browserHistory.push('/appointments/')}>Zu Ernennungs</button></div>
       <p><Link to="/about">About</Link></p>
       <p><Link to="/users">Users</Link></p>
      </div>
      )
  }
}
export default App;
