import { GET_PROFILE, PROFILE_ERROR } from './types';
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