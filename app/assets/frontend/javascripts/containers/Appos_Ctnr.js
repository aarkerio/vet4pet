import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component, PropTypes } from 'react'
import { ReactDom } from 'react-dom'
import * as ApposActionCreators from '../actions/appos'
//import { fetchAppos } from '../actions/appos'
// console.log(ApposActionCreators)

// import AppointmentForm from './ApposPageForm'

require('bootstrap')
require('bootstrap-webpack')

class ApposComponent extends Component {
 constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(' componentDidMount ' + JSON.stringify(this.props))
    let action = ApposActionCreators.fetchAppos()
    this.props.dispatch(action)
  }
  render() {
    var trNodes = this.props.apposArrayProp.map(function (appointment) {
      console.log('trNodes ##########################')
    })
    return (
      <div className="appoList">hggjhgjh
         <div className="appoDivForm"></div><br />
      </div>
    )
  }
}

ApposComponent.propTypes = {
  apposArrayProp: PropTypes.array.isRequired
}

ApposComponent.defaultProps = {
     apposArrayProp:  []
 }

const mapStateToProps = (state) => {
  return {
    apposArrayProp: state.apposArrayProp
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, ApposActionCreators), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApposComponent)
