import { ADD_POST, GET_POSTS, POST_ERROR, LIKE_POST, UNLIKE_POST, LIKE_ERROR } from './types';
import { setAlert } from './alert';
import axios from 'axios';
import { post } from 'request';

// Get All Posts
export function getAllPosts() {
    return async (dispatch) => {

        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            let res = await axios.get('/api/posts');

            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}

// Add New Post
export function addPost(newPost) {
    return async (dispatch) => {
        
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            await axios.post('/api/posts', newPost, config);
            let res = await axios.get('/api/posts');

            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: POST_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            });
        }
    }
}

// Like post 
export function likePost(id) {
    return async (dispatch) => {
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
    
        try {
            let res = await axios.put(`/api/posts/likes/${id}`, null, config);
            
            dispatch({
                type: LIKE_POST,
                payload: { id, likes: res.data }
            })
        } catch (error) {
            dispatch({
                type: LIKE_ERROR,
                payload: { msg: error.response.data }
            })
        }
    }
}

// Unlike post
export function unlikePost(id) {
    return async (dispatch) => {
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        
        try {
            let res = await axios.put(`/api/posts/unlike/${id}`, null, config);

            dispatch({
                type: UNLIKE_POST,
                payload: { id, likes: res.data }
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: LIKE_ERROR,
                payload: { msg : error.response.data }
            })
        }

    }
}