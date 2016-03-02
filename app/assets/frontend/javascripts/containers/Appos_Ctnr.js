import { connect } from 'react-redux'
import * as ApposActionCreators from '../actions/appos'
import React, { Component, PropTypes } from 'react'
import { Router, Route, Link, DefaultRoute, RouteHandler } from 'react-router'
import AppoRow from '../components/AppoRow'
class ApposComponent extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(' In componentDidMount ' + JSON.stringify(this.props))
    let action = ApposActionCreators.fetchAppos()
    this.props.dispatch(action)
  }
  orderList(field, order) {

  }
  render() {
    var rows = [];
    this.props.apposArrayProp.forEach(function (appo) {
      rows.push(<AppoRow appointment={appo} key={appo.id} keyRow={appo.id}/>);
    });
    return (
      <table className="myTable" key="myta">
        <thead>
          <tr>
            <th>Edit</th>
            <th><a href="#" onClick={this.orderList.bind(this, 'owner', 'asc')}>Owner</a></th>
            <th><a href="#" onClick={this.orderList.bind(this, 'date', 'asc')}>Scheduled date</a></th>
            <th>Pet</th>
            <th>Reason</th>
            <th><a href="#" onClick={this.orderList.bind(this, 'doctor', 'asc')}>Doctor</a></th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <RouteHandler/>
    )
  }
}

ApposComponent.propTypes = {
  apposArrayProp: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

 ApposComponent.defaultProps = {
      apposArrayProp:  []
 }

let routes = (
  <Route path="/" component={ApposComponent}>
    <Route path="appos" component={AppoRow}>
        <Route path="/appo/:userId" component={AppoModal}/>
    </Route>
    <Route path="*" component={NoMatch}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

const mapStateToProps = (state) => {
  return {
    apposArrayProp: state.appointments_rdcer.apposArrayProp
  }
}

export default connect(mapStateToProps)(ApposComponent)
