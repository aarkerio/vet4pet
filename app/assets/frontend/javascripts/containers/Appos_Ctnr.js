import { connect } from 'react-redux'
import * as ApposActionCreators from '../actions/appos'
import React, { Component, PropTypes } from 'react'
import { ReactDom } from 'react-dom'
import AppoRow from '../components/AppoRow'

class ApposComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false,
      isExecuting: false,
      textValues: ["Delete", "Are you sure?", "Deleting..."]
    }
  }
  componentDidMount() {
    console.log(' In componentDidMount ' + JSON.stringify(this.props))
    let action = ApposActionCreators.fetchAppos()
    let vall = this.props.dispatch(action)
  }
  //onClick={() => onTodoClick(appo.id)}
  render() {
    var rows = [];
    this.props.apposArrayProp.forEach(function (appo) {
      rows.push(<AppoRow appointment={appo} key={appo.id} />);
    });
    return (
      <div className="appoList">
        <table className="myTable" key="myta">
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
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

ApposComponent.propTypes = {
  apposArrayProp: PropTypes.array
}

 ApposComponent.defaultProps = {
      apposArrayProp:  []
 }

const mapStateToProps = (state) => {
  return {
    apposArrayProp: state.appointments_rdcer.apposArrayProp
  }
}

export default connect(mapStateToProps)(ApposComponent)
