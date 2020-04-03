import {
    ADD_CONTACT, ADD_GENERAL_INFO,
    DISPATCH_HELP,
    LOADING_DATA,
    SET_ADDITIONAL_INFO,
    SET_CONTACTS,
    SET_GENERAL_INFO,
    SET_INCIDENTS
} from "../types";

const initialState = {
    incidents: [],
    loading: false,
    contact: {},
    contacts: [],
    generalInfo: [],
};
/** @namespace incident.incidentId **/
export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {...state, loading: true};
        case SET_INCIDENTS:
            return {...state, incidents: action.payload, loading: false};
        case DISPATCH_HELP:
            let index = state.incidents.findIndex(incident => incident.incidentId === action.payload.incidentId);
            state.incidents.splice(index, 1);
            return {...state};
        case ADD_CONTACT:
            return {...state, contacts: [action.payload, ...state.contacts]};
        case SET_CONTACTS:
            return {...state, contacts: action.payload, loading: false};
        case SET_GENERAL_INFO:
            return {...state, generalInfo: action.payload, loading: false};
        case SET_ADDITIONAL_INFO:
            return {...state, singleItemInfo:action.payload, loading: false};
        case ADD_GENERAL_INFO:
            return {...state};
        default:
            return state
    }
}
