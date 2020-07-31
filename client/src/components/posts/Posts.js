import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { addPost, getAllPosts, likePost, unlikePost, deletePost } from '../../actions/posts';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

function Posts(props) {

    useEffect(() => {
        props.getAllPosts();
    }, [props.getAllPosts])

    let [text, setText] = useState('');

    function handleChange(event) {
        setText(
            event.target.value
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addPost({ text });
        setText('')
    }


    return (
        <Fragment>
            <h1 className="large text-primary">
                Posts
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1">
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        value={text}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" onClick={handleSubmit}/>
                </form>
            </div>

            {props.posts.loading ? <Spinner /> :
                props.posts.posts.map(post => {
                    return (
                        <div className="posts" key={post._id}>
                            <div className="post bg-white p-1 my-1">
                                <div>
                                    <Link to={`/profile/user/${post.user}`}>
                                        <img
                                            className="round-img"
                                            src={post.avatar}
                                            alt="avatar"
                                        />
                                        <h4>{post.name}</h4>
                                    </Link>
                                </div>
                                <div>
                                    <p className="my-1">{post.text}</p>
                                    <p className="post-date"><Moment format="YYYY/MM/DD">{post.date}</Moment></p>
                                    <button type="button" className="btn btn-light" onClick={() => props.likePost(post._id)}>
                                        <i className="fas fa-thumbs-up"></i>{' '}
                                        {post.likes.length !==0 && <span>{post.likes.length}</span>}
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={() => props.unlikePost(post._id)}>
                                        <i className="fas fa-thumbs-down"></i>
                                    </button>
                                    <Link to="post.html" className="btn btn-primary">
                                        Discussion 
                                        {post.comments.length !==0 && <span className='comment-count'>{post.comments.length}</span>}
                                    </Link>
                                    {props.auth.user && props.auth.user._id === post.user 
                                    && 
                                    <button type="button" className="btn btn-danger" onClick={() => props.deletePost(post._id)}>
                                        <i className="fas fa-times"></i>
                                    </button>}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

Posts.propTypes = {
    addPost: PropTypes.func.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        posts: state.posts
    }
}

export default connect(mapStateToProps, { addPost, getAllPosts, likePost, unlikePost, deletePost })(Posts);