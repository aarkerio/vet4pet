'use strict';

import React, { PropTypes, Component } from 'react';
import { Router, Route, Link } from 'react-router';
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
    return appo_id;
  }

  render() {
    const { appointment, key } = this.props;
    return (
      <tr key={key}>
        <td style={{width: '35px', padding:0}}> <Link to={"/appointment/"+appointment.id+"/"}>Edit</Link></td>
        <td style={{width: '35px', padding:0}}> {appointment.owner_name}   </td>
        <td style={{width: '35px', padding:0}}> {appointment.date}    </td>
        <td style={{width: '35px', padding:0}}> {appointment.pet_name} </td>
        <td style={{width: '35px', padding:0}}> {appointment.reason}  </td>
        <td style={{width: '35px', padding:0}}> {appointment.doc_name} </td>
        <td style={{width: '35px', padding:0}}> <a href="#" onClick={this.deleteAppointment.bind(this, appointment.id)}>Delete</a></td>
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
