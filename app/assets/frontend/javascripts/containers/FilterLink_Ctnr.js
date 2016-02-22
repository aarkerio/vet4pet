import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/index'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter)) // dispatch action
    }
  }
}

// Container binding with representational component
const FilterLink = connect(
  mapStateToProps,       // pass "state" value
  mapDispatchToProps     // call the action
)(Link)

export default FilterLink
