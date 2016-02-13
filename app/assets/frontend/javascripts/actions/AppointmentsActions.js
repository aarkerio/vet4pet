/* Chipotle Software (c) 2015-2016 MIT License*/
/*
 * action types
 */
import * as types from '../constants/ActionTypes';

/*
 * action creators
 */

export function addAppo(name) {
    return {
        type: types.ADD_APPO,
        name
    };
}

export function deleteAppo(id) {
    return {
        type: types.DELETE_APPO,
        id
    };
}

export function starAppos(id) {
    return {
        type: types.STAR_APPOS,
        id
    };
}
