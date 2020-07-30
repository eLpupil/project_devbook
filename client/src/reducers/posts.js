import { ADD_POST, GET_POSTS, POST_ERROR, LIKE_POST, LIKE_ERROR, UNLIKE_POST } from '../actions/types';

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
        case LIKE_POST:
        case UNLIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload.id ? { ...post, likes: action.payload.likes } : post),
                loading: false
            }
        case POST_ERROR:
        case LIKE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
