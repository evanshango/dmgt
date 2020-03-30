import {DISPATCH_HELP, LOADING_DATA, SET_INCIDENTS} from "../types";

const initialState = {incidents: [], incident: {}, loading: false};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return { ...state, loading: true};
        case SET_INCIDENTS:
            return {...state, incidents: action.payload, loading: false};
        case DISPATCH_HELP:
            let index = state.incidents.findIndex((incident) => incident.incidentId === action.payload);
            state.incidents[index] = action.payload;
            return {...state};
        default:
            return state
    }
}
