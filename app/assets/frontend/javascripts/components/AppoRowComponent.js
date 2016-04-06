'use strict';

import React, { PropTypes, Component } from 'react';
import { Router, Route, Link } from 'react-router';
import * as ApposActionCreators from '../actions/appos';
//import InlineConfirmButton from "react-inline-confirm"
//import { Button } from 'react-bootstrap';

class AppoRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false,
      isExecuting: false,
      textValues: ["Delete", "Are you sure?", "Deleting..."]
    }
    this.editAppointment = this.editAppointment.bind(this);
  }

 /*
  *  Add appointment
  *  Private
  */
  editAppointment(e, appo) {
    e.preventDefault();
    return appo;
  }

 /*
  *  Add appointment
  *  Private
  */
  deleteAppointment(appo_id) {
    let action = ApposActionCreators.deleteAppo(appo_id);
    this.props.dispatch(action);  // thunk middlew
    console.log(' to delete appo_id: >>>>' + appo_id);
    // window.location='/appointments';
  }

  render() {
    const { appointment, key } = this.props;
    return (
      <tr key={key}>
        <td style={{width: '35px', padding:0, textAlign: 'center'}}> <Link to={"/appointment/"+appointment.id+"/"}><i className="glyphicon glyphicon-pencil"></i></Link></td>
        <td style={{width: '35px', padding:0}}> {appointment.owner_name}   </td>
        <td style={{width: '35px', padding:0}}> {appointment.date}    </td>
        <td style={{width: '35px', padding:0}}> {appointment.pet_name} </td>
        <td style={{width: '35px', padding:0}}> {appointment.reason}  </td>
        <td style={{width: '35px', padding:0}}> {appointment.doc_name} </td>
        <td style={{width: '35px', padding:0, textAlign:'center'}}>
          <a href="#" onClick={() => {if(confirm('Delete the item?')) {this.deleteAppointment.bind(this, appointment.id)};}} className="removable"><i className="glyphicon glyphicon-trash"></i></a>
        </td>
      </tr>  
    )
  }
}

AppoRow.propTypes = {
  appointment: PropTypes.object.isRequired,
  keyRow: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

export default AppoRow
