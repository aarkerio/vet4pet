import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppoActionCreators from '../actions/appos'

import React, { Component, PropTypes } from 'react'
import { ReactDom } from 'react-dom'
import InlineConfirmButton from "react-inline-confirm"
import { Button } from 'react-bootstrap'

// import AppointmentForm from './ApposPageForm'

require('bootstrap')
require('bootstrap-webpack')

class ApposComponent extends Component {
 constructor(props) {
    super(props)

    const order = {
      textValues: ["Delete", "Are you sure?", "Deleting..."]
    }

    this.state = {
      isHovering: false,
      isExecuting: false,
      textValues: ["Delete", "Are you sure?", "Deleting..."]
    }

    //this.getApposFromRails = this.getApposFromRails.bind(this) // binding
    //this.getApposFromRails()
  }
   componentDidMount() {
    console.log(' POOO' + JSON.stringify(this.actions))
    //const { dispatch } = this.props
    this.props.dispatch(fetchAppos('0'))
  }

  render() {
    var todos   = []
    var trNodes = this.props.apposArrayProp.map(function (appointment) {
      var row   = <tr key={appointment.id}>
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
        </tr>
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
  apposArrayProp: PropTypes.arrayOf(PropTypes.shape({
    id:       PropTypes.number.isRequired,
    owner:    PropTypes.string.isRequired,
    date:     PropTypes.string.isRequired,
    reason:   PropTypes.string.isRequired,
    petname:  PropTypes.string.isRequired,
    docname:  PropTypes.string.isRequired
  }).isRequired).isRequired,
  appoIdIntProp: PropTypes.number.isRequired
  //dispatch: PropTypes.func.isRequired
}

ApposComponent.defaultProps = {
     apposArrayProp:  [],
     appoIdIntProp:   0
 }

const mapStateToProps = (state) => {
  return {
          apposArrayProp: state.apposArrayProp
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ AppoActionCreators }, dispatch);
}

const Appos_Ctnr = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApposComponent)

export default Appos_Ctnr
