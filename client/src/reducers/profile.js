import {
    GET_PROFILE,
    PROFILE_ERROR,
    LOGOUT,
    AUTH_ERROR,
    CREATE_PROFILE,
    ADD_EXPERIENCE,
    DELETE_EXPERIENCE,
    DELETE_EDUCATION,
    ADD_EDUCATION,
    EDIT_ERROR,
    DELETE_ERROR,
    DELETE_ACCOUNT
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
        case DELETE_EXPERIENCE:
        case DELETE_EDUCATION:
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
        case DELETE_ACCOUNT:
            return {
                ...state,
                ...initialState,
                loading: false
            }
        case EDIT_ERROR:
        case DELETE_ERROR:
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