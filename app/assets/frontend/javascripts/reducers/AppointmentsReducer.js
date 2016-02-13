import { combineReducers } from 'redux'
// import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
import * as types from '../constants/ActionTypes'
const { SHOW_ALL } = VisibilityFilters

const initialState = {
  appointments: [1, 2, 3],
  appointmentsById: {
    1: {
      id: 1,
      name: 'Theodore Roosevelt'
    },
    2: {
      id: 2,
      name: 'Abraham Lincoln'
    },
    3: {
      id: 3,
      name: 'George Washington'
    }
  }
};

export default function appointmentsApp(state = initialState, action) {

  switch (action.type) {

    case types.ADD_APPO:
      const newId = state.appointments[state.appointments.length-1] + 1;
      return Object.assign({}, state, {
        visibilityFilter: action.filter,
        appointments: state.appointments.concat(newId),
        appointmentsById: {
          state.appointmentsById,
          [newId]: {
            id: newId,
            name: action.name
          }
        },
      }

    case types.DELETE_APPO:
      return Object.assign({}, state, {
        appointments: state.appointments.filter(id => id !== action.id),
        appointmentsById: omit(state.appointmentsById, action.id)
      }

    case types.STAR_APPOS:
      return Object.assign({}, state, {
        appointmentsById: mapValues(state.appointmentsById, (friend) => {
          return friend.id === action.id ?
            assign({}, friend, { starred: !friend.starred }) :
            friend
        })
      }

    case types.SHOW_OWNER_LIST:
      return Object.assign({}, state, {
        appointmentsById: mapValues(state.appointmentsById, (friend) => {
          return friend.id === action.id ?
            assign({}, friend, { starred: !friend.starred }) :
            friend
        })
      }

    default:
      return state
  }
}