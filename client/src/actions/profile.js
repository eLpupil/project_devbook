import {
    GET_PROFILE,
    GET_PROFILE_BY_ID,
    GET_PROFILES,
    PROFILE_ERROR,
    CREATE_PROFILE,
    ADD_EXPERIENCE,
    ADD_EDUCATION,
    EDIT_ERROR,
    DELETE_ERROR,
    DELETE_EXPERIENCE,
    DELETE_EDUCATION,
    DELETE_ACCOUNT,
    GET_GITHUB,
    GITHUB_ERROR
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setHeaderWithToken from '../utils/setAuthToken';


// Get Authenticated User Profile
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

// Get All Profiles
export function getProfiles() {
    return async (dispatch) => {

        try {
            let res = await axios.get('/api/profile');

            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}

// Get Profile By ID
export function getProfileById(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`/api/profile/user/${id}`);
            
            dispatch({
                type: GET_PROFILE_BY_ID,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
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
            dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

            if (!edit) {
                history.push('/dashboard');
            }

        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: EDIT_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}

// Add Experience
export function addExperience(newExperience, history) {
    return async (dispatch) => {
        try {

            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            let res = await axios.put('/api/profile/experience', newExperience, config);
            dispatch({
                type: ADD_EXPERIENCE,
                payload: res.data
            });
            dispatch(setAlert('New experience added', 'success'));

            history.push('/dashboard');

        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: EDIT_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}

// Add Education
export function addEducation(newEducation, history) {
    return async (dispatch) => {
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            let res = await axios.put('/api/profile/education', newEducation, config);

            dispatch({
                type: ADD_EDUCATION,
                payload: res.data
            });
            dispatch(setAlert('New education added', 'success'));

            history.push('/dashboard');

        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: EDIT_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}

// Delete Experience
export function deleteExperience(id) {
    return async (dispatch) => {
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            let res = await axios.delete(`/api/profile/experience/${id}`, config);

            dispatch({
                type: DELETE_EXPERIENCE,
                payload: res.data
            });
            dispatch(setAlert('Experience deleted', 'success'));

        } catch (error) {
            dispatch({
                type: DELETE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}

// Delete Education
export function deleteEducation(id) {
    return async (dispatch) => {
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            let res = await axios.delete(`/api/profile/education/${id}`, config);

            dispatch({
                type: DELETE_EDUCATION,
                payload: res.data
            });
            dispatch(setAlert('Education deleted', 'success'));

        } catch (error) {
            dispatch({
                type: DELETE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}

// Delete Profile
export function deleteAccount() {
    return async (dispatch) => {
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        if (window.confirm('Account will be PERMANENTLY deleted. Are you sure you want to continue?')) {
            try {
                let res = await axios.delete('/api/profile/me', config);

                dispatch({
                    type: DELETE_ACCOUNT,
                    payload: res.data
                })
                dispatch(setAlert('Account has been permanently deleted', 'success'));

            } catch (error) {
                dispatch({
                    type: DELETE_ERROR,
                    payload: { msg: error.response.statusText, status: error.response.status }
                })
            }
        }
    }
}

// Get User Github
export function getGithub(githubUser) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`/api/profile/github/${githubUser}`);

            dispatch({
                type: GET_GITHUB,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: GITHUB_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}