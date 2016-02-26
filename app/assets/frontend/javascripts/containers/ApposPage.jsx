import React, { PropTypes } from 'react'
import { ReactDom } from 'react-dom'
import { connect } from 'react-redux'
import { fetchAppos, fetchApposIfNeeded, invalidateAppo } from '../actions/index'
import InlineConfirmButton from "react-inline-confirm"
import { Button } from 'react-bootstrap'

// import AppointmentForm from './ApposPageForm'

require('bootstrap')
require('bootstrap-webpack')

//const ApposPage = ({ onClick, completed, text }) => (
//TodoList = ({ todos, onTodoClick }) => (
class ApposPage extends React.Component {
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
    this.props.dispatch(fetchAppos(owner_id))
  }

  /*
   *  Send data to get the autofill field
   */
  sendDataToRails(url) {
    link = {url: '/appointments/get_data'}
    $.ajax({
      type: 'GET',
      url: link['url'],
      data: link,
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      success: function(data) {
        var data = this.state.data
        //I do this so the new added link will be on top of the array
        var newLinks = [data].concat(links)
        // this.setState({data: newLinks});
        this.setState({owners: newLinks})
      }.bind(this)
    })
  }

  /*
   *  Add appointment
   *  Private
   */
  _addAppointment(record) {
    var records
    records = React.addons.update(this.state.records, {
      $push: [record]
    })
    return this.setState({
      records: records
    })
  }

  /*
   *  Add appointment
   *  Private
   */
  _editAppointment(record) {
    console.log('I am in _editAppointment')
    $.ajax({
      type: 'GET',
      url: link['url'],
      data: link,
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      success: function(data) {
        // this.setState({appos: data});
      }.bind(this)
    })
  }

  /*
   *  Delete appointment
   *  Private
   */
  _deleteAppointment(id) {
      var link = {url: '/appointments/appo_delete', data: id}
      console.log('I am in _delAppointment')
      $.ajax({
      type: 'GET',
      url: link['url'],
      data: link,
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      success: function(data) {
        // this.setState({appos: data});
      }.bind(this)
    })
  }

  render() {
    var todos = [];
    var trNodes = this.state.appos.map(function (appointment) {
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

ApposPage.propTypes = {
    apposArrayProp:   React.PropTypes.array.isRequired,
    ownerStringProp:  React.PropTypes.string.isRequired
}

ApposPage.defaultProps = {
    //     aStringProp:       '',
    ownerStringProp:   '',
    //     petnameStringProp: '',
    //     docnameStringProp: '',
    //     dateDateProp:      '',
    //     reasonStringProp:  '',
    apposArrayProp:   []
}

// function mapStateToProps(state) {
//   const { selectedReddit, postsByReddit } = state
//   const {
//     isFetching,
//     lastUpdated,
//     items: posts
//   } = postsByReddit[selectedReddit] || {
//     isFetching: true,
//     items: []
//   }

//   return {
//     selectedReddit,
//     appos,
//     isFetching,
//     lastUpdated
//   }
// }

const mapStateToProps = (state) => {
  return {
    // active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (owner_id) => {
      dispatch(fetchAppos(owner_id))
    }
  }
}

const Appos = connect(
  mapStateToProps
)(ApposPage)

export default Appos

