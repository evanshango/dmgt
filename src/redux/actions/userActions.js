import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post('/login', userData).then(res => {
        const authToken = `Bearer ${res.data.token}`;
        localStorage.setItem('token', authToken);
        axios.defaults.headers.common['Authorization'] = authToken;
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});
        history.push('/');
    }).catch(err => {
        dispatch({type: SET_ERRORS, payload: err.response.data})
    })
};

export const loginAdmin = (adminData, history) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post('/login/admin', adminData).then(res => {
        const token = `Bearer ${res.data.token}`;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = token;
        dispatch(getAdminData());
        dispatch({type: CLEAR_ERRORS});
        history.push('/');
    }).catch(err => {
        dispatch({type: SET_ERRORS, payload: err.response.data})
    })
};

export const getAdminData = () => dispatch => {
    dispatch({type: LOADING_USER});
    axios.get('/admin').then(res => {
        dispatch({type: SET_USER, payload: res.data})
    }).catch(err => console.log(err))
};

export const getUserData = () => dispatch => {
    dispatch({type: LOADING_USER});
    axios.get('/contact').then(res => {
        dispatch({type: SET_USER, payload: res.data})
    }).catch(err => console.log(err))
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED})
};

export const uploadImage = (formData, contactId) => dispatch => {
    dispatch({type: LOADING_USER });
    axios.post('contact/image', formData).then(() => {
        dispatch(getUserData(contactId))
    }).catch(err => console.log(err));
};

export const editContactDetails = contactDetails => dispatch => {
  dispatch({type: LOADING_USER});
  axios.post('/contact/details', contactDetails).then(() => {
      dispatch(getUserData());
  }).catch(err => console.log(err))
};


