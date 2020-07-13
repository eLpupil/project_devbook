import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';
import setHeaderWithToken from '../utils/setAuthToken';

// Load User
export function loadUser() {
    return async (dispatch) => {

        if (localStorage.token) {
            setHeaderWithToken(localStorage.token);
        }

        try {
            let res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }

    }
}

// Register User
export function register(newUser) {
    return async (dispatch) => {

        let config = {
            'Content-Type': 'application/json'
        }

        try {
            let res = await axios.post('/api/users', newUser, config);
            
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            dispatch(loadUser());

        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            dispatch({
                type: REGISTER_FAIL
            })            
        }

    }
}

// Login User
export function login(user) {
    return async (dispatch) => {
        let config = { 'Content-Type': 'application/json'}

        try {
            let res = await axios.post('/api/auth', user, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

            dispatch(loadUser());

        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: LOGIN_FAIL
            })
        }
    }
}

// Logout User
export function logout() {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
        dispatch(setAlert('Successfully Logged Out', 'success'));        
    }
}