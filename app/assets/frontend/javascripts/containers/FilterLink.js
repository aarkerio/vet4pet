import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/index'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  console.log('state.visibilityFilter FilterLink.js: ' + state.visibilityFilter)
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))  //dispatch action to the store
    }
  }
}

// Container binding with representational component
const FilterLink = connect(
  mapStateToProps,       // pass "state" value
  mapDispatchToProps     // call the reducer
)(Link)

export default FilterLink
