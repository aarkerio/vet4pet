import * as types from '../constants/ActionTypes';
import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';

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

export default function appointments(state = initialState, action) {
  switch (action.type) {

    case types.ADD_APPO:
      const newId = state.appointments[state.appointments.length-1] + 1;
      return {
        ...state,
        appointments: state.appointments.concat(newId),
        appointmentsById: {
          ...state.appointmentsById,
          [newId]: {
            id: newId,
            name: action.name
          }
        },
      }

    case types.DELETE_APPO:
      return {
        ...state,
        appointments: state.appointments.filter(id => id !== action.id),
        appointmentsById: omit(state.appointmentsById, action.id)
      }

    case types.STAR_APPOS:
      return {
        ...state,
        appointmentsById: mapValues(state.appointmentsById, (friend) => {
          return friend.id === action.id ?
            assign({}, friend, { starred: !friend.starred }) :
            friend
        })
      }

    default:
      return state;
  }
}