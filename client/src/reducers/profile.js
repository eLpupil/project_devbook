import {
    GET_PROFILE,
    GET_PROFILE_BY_ID,
    GET_PROFILES,
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
    DELETE_ACCOUNT,
    GET_GITHUB,
    GITHUB_ERROR
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
        case GET_PROFILE_BY_ID:
        case CREATE_PROFILE:
        case ADD_EXPERIENCE:
        case DELETE_EXPERIENCE:
        case DELETE_EDUCATION:
        case ADD_EDUCATION:
            return {
                ...state,
                profile: action.payload,
                repos: null,
                loading: false,
                error: {}
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                repos: null,
                loading: false,
                error: {}
            }
        case GET_GITHUB:
            return {
                ...state,
                loading: false,
                repos: action.payload,
                error: {}
            }
        case LOGOUT:
        case AUTH_ERROR:
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                loading: false,
                repos: null,
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
        case GITHUB_ERROR:
            return {
                ...state,
                loading: false,
                repos: null,
                error: action.payload
            }
        default:
            return state;
            break;
    }
}