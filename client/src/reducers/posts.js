import { ADD_POST, GET_POSTS, POST_ERROR } from '../actions/types';

let initialState = {
    post: {},
    posts: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ADD_POST:
        case GET_POSTS:
            return {
                ...state,
                posts: [...action.payload],
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}