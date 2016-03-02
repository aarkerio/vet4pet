import React, { PropTypes, Component } from 'react'
import { Router, Route, Link } from 'react-router'
//import InlineConfirmButton from "react-inline-confirm"
//import { Button } from 'react-bootstrap'

// require('bootstrap')
// require('bootstrap-webpack')

class AppoRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appos: [],
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
        <td>
          <Link to={'/appo/${appointment.id}'}>Edit</Link>
        </td>
        <td> {appointment.owner}   </td>
        <td> {appointment.date}    </td>
        <td> {appointment.petname} </td>
        <td> {appointment.reason}  </td>
        <td> {appointment.docname} </td>
        <td>
          <a href="#" onClick={this.deleteAppointment.bind(this, appointment.id)}>Owner</a>
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
