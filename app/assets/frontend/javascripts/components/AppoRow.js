import React, { PropTypes, Component } from 'react'
import { ReactDom } from 'react-dom'
import InlineConfirmButton from "react-inline-confirm"
import { Button } from 'react-bootstrap'

require('bootstrap')
require('bootstrap-webpack')

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
  editAppointment(appo) {
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
    const { appointment } = this.props;
    return (
      <tr>
        <td>
          <button className="btn btn-default" onClick={this.editAppointment.bind(this, appointment)}>Edit</button>
        </td>
        <td> {appointment.owner}   </td>
        <td> {appointment.date}    </td>
        <td> {appointment.petname} </td>
        <td> {appointment.reason}  </td>
        <td> {appointment.docname} </td>
        <td>
          <div className="clearfix">
              <InlineConfirmButton className="btn btn-default" isExecuting={false} textValues={this.state.textValues} showTimer={true} onClick={this.deleteAppointment.bind(this, appointment.id)}>
              <i className="fa fa-trash"></i>
            </InlineConfirmButton>
          </div>
        </td>
      </tr>
    )
  }
}

AppoRow.propTypes = {
  appointment: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default AppoRow
