import {
    CLEAR_ERRORS,
    DISPATCH_HELP,
    LOADING_DATA,
    LOADING_UI, SET_ADDITIONAL_INFO,
    SET_CONTACTS,
    SET_GENERAL_INFO,
    SET_INCIDENTS,
    STOP_LOADING_UI
} from "../types";
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

export const getGeneralInfo = () => dispatch => {
  dispatch({type: LOADING_DATA});
  axios.get('/general').then(res => {
      dispatch({type: SET_GENERAL_INFO, payload: res.data})
  }).catch(err => {
      console.log(err);
      dispatch({type: SET_GENERAL_INFO, payload: []})
  })
};

export const dispatchHelp = incidentId => dispatch => {
    dispatch({type: LOADING_UI});
    axios.get(`/incident/${incidentId}/dispatch/help`).then(res => {
        dispatch({type: DISPATCH_HELP, payload: res.data});
        dispatch({type: STOP_LOADING_UI})
    }).catch(err => {
        console.log(err)
    })
};

export const getContacts = () => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get('/contacts').then(res => {
        dispatch({type: SET_CONTACTS, payload: res.data})
    }).catch(err => {
        console.log(err);
        dispatch({type: SET_CONTACTS, payload: []})
    })
};

export const clearErrors = () => dispatch => {
  dispatch({type: CLEAR_ERRORS})
};

export const getAdditionalItemInfo = infoId => dispatch => {
  axios.get(`/general/${infoId}`).then(res => {
      dispatch({type: SET_ADDITIONAL_INFO, payload: res.data})
  }).catch(err => {
      console.log(err);
      dispatch({type: SET_ADDITIONAL_INFO, payload: []})
  })
};
