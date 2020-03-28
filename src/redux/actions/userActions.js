import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post('/login', userData).then(res => {
        const authToken = `Bearer ${res.data.token}`;
        localStorage.setItem('token', authToken);
        axios.defaults.headers.common['Authorization'] = authToken;
        dispatch(getUserData(res.data.contactId));
        dispatch({type: CLEAR_ERRORS});
        history.push('/');
    }).catch(err => {
        dispatch({type: SET_ERRORS, payload: err.response.data})
    })
};

export const getUserData = contactId => dispatch => {
    axios.get(`/contact/${contactId}`).then(res => {
        dispatch({type: SET_USER, payload: res.data})
    }).catch(err => console.log(err))
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED})
};


