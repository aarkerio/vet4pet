'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';

class App extends Component {
  constructor(props) {
      super(props);
      console.log('App constructor:' + JSON.stringify(props));
  }
  render() {
    return (
      <div>
       <h1>Anwendung</h1>
       <p><Link to="/">Zuhause.</Link></p>
       <p><Link to="/appointments">Edit Ernennungs.</Link></p>
       <div><button onClick={() => browserHistory.push('/appointments')}>Zu Ernennungs</button></div>
       <p><Link to="/about">About</Link></p>
       <p><Link to="/users">Users</Link></p>
       {this.props.children}
      </div>
      )
  }
}
export default App;
