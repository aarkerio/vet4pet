import { connect } from 'react-redux'
import ApposComponent from '../components/Appos'
import { bindActionCreators } from 'redux'
import * as AppoActionCreators from '../actions/appos'


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
