import {DISPATCH_HELP, LOADING_DATA, SET_INCIDENTS} from "../types";
import axios from 'axios';

export const getIncidents = () => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get('/unresolved/incidents').then(res => {
        dispatch({type: SET_INCIDENTS, payload: res.data})
    }).catch(err => {
        console.log(err);
        dispatch({type: SET_INCIDENTS, payload: []})
    })
};

export const dispatchHelp = incidentId => dispatch => {
    axios.get(`/incident/${incidentId}/dispatch/help`).then(res => {
        dispatch({type: DISPATCH_HELP, payload: res.data})
    }).catch(err => {
        console.log(err)
    })
};
