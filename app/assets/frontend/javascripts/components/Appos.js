import React, { Component, PropTypes } from 'react'
import { ReactDom } from 'react-dom'
import InlineConfirmButton from "react-inline-confirm"
import { fetchAppos, fetchApposIfNeeded, invalidateAppo } from '../actions/index'
import { Button } from 'react-bootstrap'

// import AppointmentForm from './ApposPageForm'

require('bootstrap')
require('bootstrap-webpack')

class ApposComponent extends Component {
 constructor(props) {
    super(props)
    // this.props.isExecuting = false;

    const order = {
      textValues: ["Delete", "Are you sure?", "Deleting..."]
    }

    this.state = {
      appos: [],
      isHovering: false,
      isExecuting: false,
      textValues: ["Delete", "Are you sure?", "Deleting..."]
    }

    this.getApposFromRails = this.getApposFromRails.bind(this) // binding
    this.getApposFromRails()
  }

  /*
   *  Get data to get the autofill field
   */
  getApposFromRails(owner_id='') {
    console.log('ApposPage >>> getApposFromRails')
    this.props.dispatch(fetchAppos(this.props.appoIdIntProp))
  }

  render() {
    var todos = [];
    var trNodes = this.props.apposArrayProp.map(function (appointment) {
      var row = <tr key={appointment.id}>
        <td>
          <button  className="btn btn-default" onClick={this._editAppointment.bind(this, appointment.id)}>Edit</button>
        </td>
        <td>{appointment.owner}</td>
        <td>{appointment.date}</td>
        <td>{appointment.petname}</td>
        <td>{appointment.reason}</td>
        <td>{appointment.docname}</td>
        <td>
          <div className="clearfix">
            <InlineConfirmButton className="btn btn-default" isExecuting={false} textValues={this.state.textValues} showTimer={true} onClick={this._deleteAppointment.bind(this, appointment.id)}>
              <i className="fa fa-trash"></i>
            </InlineConfirmButton>
          </div>
        </td>
        </tr>;
        todos.push(row);
    }.bind(this))
    // console.log(todos);
    var appoNodes = <table className="myTable" key="myta">
      <thead>
        <tr>
          <th>Edit</th>
          <th>Owner</th>
          <th>Scheduled date</th>
          <th>Pet</th>
          <th>Reason</th>
          <th>Doctor</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        { todos }
      </tbody>
      </table>

    //var form = React.createElement(AppointmentForm, {handleNewAppointment: this._addAppointment } );
    return (
      <div className="appoList">
         <div className="appoDivForm"></div><br />
         {appoNodes}
      </div>
    )
  }
}

ApposComponent.propTypes = {
    apposArrayProp:   React.PropTypes.array,
    ownerStringProp:  React.PropTypes.string,
    appoIdIntProp:    React.PropTypes.number
}

ApposComponent.defaultProps = {
    apposArrayProp:   [],
    ownerStringProp:   '',
    appoIdIntProp:     0,
}

export default ApposComponent
