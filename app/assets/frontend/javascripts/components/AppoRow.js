'use strict';

import React, { PropTypes, Component } from 'react';
import { Router, Route, Link } from 'react-router';
//import InlineConfirmButton from "react-inline-confirm"
//import { Button } from 'react-bootstrap';

// require('bootstrap')
// require('bootstrap-webpack')

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
      <div key={key}>
        <div> <Link to={"/appointment/"+appointment.id+"/"}>Edit</Link></div>
        <div> {appointment.owner}   </div>
        <div> {appointment.date}    </div>
        <div> {appointment.petname} </div>
        <div> {appointment.reason}  </div>
        <div> {appointment.docname} </div>
        <div> <a href="#" onClick={this.deleteAppointment.bind(this, appointment.id)}>Delete</a></div>
      </div>
  
    )
  }
}

AppoRow.propTypes = {
  appointment: PropTypes.object.isRequired,
  keyRow: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

export default AppoRow
