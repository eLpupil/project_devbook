import {
    GET_PROFILE,
    PROFILE_ERROR,
    LOGOUT,
    AUTH_ERROR,
    CREATE_PROFILE,
    ADD_EXPERIENCE,
    ADD_EDUCATION,
    EDIT_ERROR
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
        case ADD_EDUCATION:
            return {
                ...state,
                profile: action.payload,
                loading: false,
                error: {}
            }
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
        case EDIT_ERROR:
            return {
                ...state,
                loading: false,
                repos: [],
                error: action.payload
            }
        default:
            return state;
            break;
    }
}