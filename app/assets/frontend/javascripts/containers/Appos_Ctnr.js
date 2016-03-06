'use strict';

import { connect } from 'react-redux';
import { render } from 'react-dom';
import * as ApposActionCreators from '../actions/appos';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import AppoRow from '../components/AppoRow';

class ApposComponent extends Component {
  constructor(props) {
      super(props);
      console.log(' In ApposComponent constructor ####################');
  }
    
  /**
   * Load default appointment
   **/
  componentDidMount() {
    console.log(' In componentDidMount ApposComponent' + JSON.stringify(this.props));
    let action = ApposActionCreators.fetchAppos();
    this.props.dispatch(action);
  }
  orderList(field, order) {
    return field;
  }
  render() {
    var rows = [];
    this.props.apposArrayProp.forEach(function (appo) {
      rows.push(<AppoRow appointment={appo} key={appo.id} keyRow={appo.id}/>);
    });
    return (
      <div className="myTable" key="myta">
        <div>
            <div>Edit</div>
            <div><a href="#" onClick={this.orderList.bind(this, 'owner', 'asc')}>Owner</a></div>
            <div><a href="#" onClick={this.orderList.bind(this, 'date', 'asc')}>Scheduled date</a></div>
            <div>Pet</div>
            <div>Reason</div>
            <div><a href="#" onClick={this.orderList.bind(this, 'doctor', 'asc')}>Doctor</a></div>
            <div>Delete</div>
        </div>
          {rows}
          {this.props.children}
      </div>
    )
  }
}

ApposComponent.propTypes = {
  apposArrayProp: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

 ApposComponent.defaultProps = {
      apposArrayProp:  []
 }

const mapStateToProps = (state) => {
  return {
    apposArrayProp: state.rootReducer.appointments_rdcer.apposArrayProp
  }
}

export default connect(mapStateToProps)(ApposComponent)
