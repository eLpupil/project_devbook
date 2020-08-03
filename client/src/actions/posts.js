import { ADD_POST, GET_POST, GET_POSTS, POST_ERROR, LIKE_POST, UNLIKE_POST, LIKE_ERROR, DELETE_POST, DELETE_POST_ERROR, ADD_COMMENT, COMMENT_ERROR, GET_POST_LOADING, DELETE_COMMENT } from './types';
import { setAlert } from './alert';
import axios from 'axios';

// Get All Posts
export function getAllPosts() {
    return async (dispatch) => {

        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            let res = await axios.get('/api/posts', config);

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

// Delete a post
export function deletePost(id) {
    return async (dispatch) => {
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        if (window.confirm('Post will be permanently deleted. Are you sure?')) {
            try {
                await axios.delete(`/api/posts/${id}`);
                let res = await axios.get('/api/posts');
    
                dispatch({
                    type: DELETE_POST,
                    payload: res.data
                })
            } catch (error) {
                dispatch({
                    type: DELETE_POST_ERROR,
                    payload: { msg: error.response.data.msg }
                })
            }
        }
    }
}

// Get a post by ID
export function getPost(id) {
    return async (dispatch) => {
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            dispatch({
                type: GET_POST_LOADING
            })
            let res = await axios.get(`/api/posts/${id}`, config);
            
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
    }
}

// Add a comment 
export function addComment(id, data) {
    return async (dispatch) => {
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            let res = await axios.put(`/api/posts/comment/${id}`, data, config);

            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            });
            
        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: COMMENT_ERROR,
                payload: { msg: error.response.data.msg }
            });
        }
    }
}

// Delete a comment
export function deleteComment(post_id, comment_id) {
    return async (dispatch) => {
        let config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        if (window.confirm('Comment will be permanently deleted. Are you sure?')) {
            try {
                let res = await axios.delete(`/api/posts/comment/${post_id}/${comment_id}`);
    
                dispatch({
                    type: DELETE_COMMENT,
                    payload: res.data
                });
            } catch (error) {
                dispatch({
                    type: COMMENT_ERROR,
                    payload: { msg: error.response.data.msg }
                })
            }
        }
    }
}