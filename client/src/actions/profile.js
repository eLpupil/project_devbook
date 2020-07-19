import { GET_PROFILE, PROFILE_ERROR, CREATE_PROFILE } from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setHeaderWithToken from '../utils/setAuthToken';

export function getCurrentProfile() {
    return async (dispatch) => {

        if (localStorage.token) {
            setHeaderWithToken(localStorage.token);
        }

        try {
            let res = await axios.get('/api/profile/me');

            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });

        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            });
        }
    }
}

// Create or update profile
export function createNewProfile(profileData, history, edit = false) {
    return async (dispatch) => {
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            let res = await axios.post('/api/profile', profileData, config);
            dispatch({
                type: CREATE_PROFILE,
                payload: res.data
            });
            dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created', 'success'));

            if (!edit) {
                history.push('/dashboard');
            }

        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}