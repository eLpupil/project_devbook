import { GET_PROFILE, PROFILE_ERROR, LOGOUT, AUTH_ERROR } from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error : {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
            break;
        case LOGOUT:
        case AUTH_ERROR:
        case PROFILE_ERROR:
            return {
                ...state,
                ...initialState,
                loading: false,
                repos: []
            }
        default:
            return state;
            break;
    }
}