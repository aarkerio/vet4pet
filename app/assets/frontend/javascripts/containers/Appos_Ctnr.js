'use strict';

import { connect } from 'react-redux';
import { render } from 'react-dom';
import * as ApposActionCreators from '../actions/appos';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import AppoRow   from '../components/AppoRow';
import AppoModal from '../components/AppoModal';

class ApposComponent extends Component {
  constructor(props) {
      super(props);
  }
    
  /**
   * Load default appointment
   **/
  componentDidMount() {
    let action = ApposActionCreators.fetchAppos();
    this.props.dispatch(action);
  }
  orderList(field, order) {
    return field;
  }
  render() {
    let rows = [];
    this.props.apposArrayProp.forEach(function(appo) {
       rows.push(<AppoRow appointment={appo} key={appo.id} keyRow={appo.id} />);
    });
    
    return (
      <div>
      <table className="MyClassName">
        <thead>
          <tr>
             <th style={{width: '35px', padding:0}} key='kedit'>Edit</th>
             <th style={{width: '35px', padding:0}} key='kowner'><a href="#" onClick={this.orderList.bind(this, 'owner', 'asc')}>Owner</a></th>
             <th style={{width: '35px', padding:0}} key='kdate'><a href="#" onClick={this.orderList.bind(this, 'date', 'asc')}>Scheduled date</a></th>
             <th style={{width: '35px', padding:0}} key='kpetname'>Pet</th>
             <th style={{width: '35px', padding:0}} key='kreason'>Reason</th>
             <th style={{width: '35px', padding:0}} key='kdoctor'><a href="#" onClick={this.orderList.bind(this, 'doctor', 'asc')}>Doctor</a></th>
             <th style={{width: '35px', padding:0}} key='kdel'>Delete</th>
           </tr>
         </thead>
         <tbody>
            { rows }
          </tbody>
          </table>
          { this.props.children }
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
