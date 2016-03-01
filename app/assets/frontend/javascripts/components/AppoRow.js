import React, { PropTypes } from 'react'

const AppoRow = ({ onClick, appointment }) => (
  <tr>
    <td>
      <button  className="btn btn-default" onClick={this._editAppointment.bind(this, appointment.id)}>Edit</button>
    </td>
    <td> {appointment.owner}   </td>
    <td> {appointment.date}    </td>
    <td> {appointment.petname} </td>
    <td> {appointment.reason}  </td>
    <td> {appointment.docname} </td>
    <td>
      <div className="clearfix">
          <InlineConfirmButton className="btn btn-default" isExecuting={false} textValues={this.state.textValues} showTimer={true} onClick={this._deleteAppointment.bind(this, appointment.id)}>
            <i className="fa fa-trash"></i>
          </InlineConfirmButton>
        </div>
    </td>
  </tr>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired
}

export default Todo
