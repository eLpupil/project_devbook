import {
    GET_PROFILE,
    PROFILE_ERROR,
    LOGOUT,
    AUTH_ERROR,
    CREATE_PROFILE,
    ADD_EXPERIENCE
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
        case CREATE_PROFILE:
        case ADD_EXPERIENCE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
                error: {}
            }
            break;
        case LOGOUT:
        case AUTH_ERROR:
        case PROFILE_ERROR:
            return {
                ...state,
                ...initialState,
                loading: false,
                repos: [],
                error: action.payload
            }
        default:
            return state;
            break;
    }
}