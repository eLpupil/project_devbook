import { ADD_POST, GET_POST, GET_POSTS, POST_ERROR, LIKE_POST, LIKE_ERROR, UNLIKE_POST, DELETE_POST, DELETE_POST_ERROR, ADD_COMMENT, COMMENT_ERROR } from '../actions/types';
import { post } from 'request';

let initialState = {
    post: {},
    posts: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false,
            }
        case ADD_POST:
        case GET_POSTS:
        case DELETE_POST:
            return {
                ...state,
                posts: [...action.payload],
                loading: false
            }
        case LIKE_POST:
        case UNLIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload.id ? { ...post, likes: action.payload.likes } : post),
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: action.payload },
                loading: false
            }
        case POST_ERROR:
        case LIKE_ERROR:
        case DELETE_POST_ERROR:
        case COMMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
