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
    let rows = [];
    this.props.apposArrayProp.forEach(function(appo) {
        rows.push(<AppoRow appointment={appo} key={appo.id} keyRow={appo.id} />);
    });
        
      return (
      <div>
      <table className="MyClassName">
        <thead>
          <tr>
             <th key='kedit'>Edit</th>
             <th key='kowner'><a href="#" onClick={this.orderList.bind(this, 'owner', 'asc')}>Owner</a></th>
             <th key='kdate'><a href="#" onClick={this.orderList.bind(this, 'date', 'asc')}>Scheduled date</a></th>
             <th key='kpetname'>Pet</th>
             <th key='kreason'>Reason</th>
             <th key='kdoctor'><a href="#" onClick={this.orderList.bind(this, 'doctor', 'asc')}>Doctor</a></th>
             <th key='kdel'>Delete</th>
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
