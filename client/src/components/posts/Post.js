import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getPost, addComment, deleteComment } from '../../actions/posts';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Post(props) {

    useEffect(() => {
        props.getPost(props.match.params.id);
    }, [props.getPost]);

    let { user, text, avatar, _id, name, likes, comments } = props.post;

    let [commentText, setText] = useState('');

    function handleChange(event) {
        setText(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addComment(_id, { text: commentText });
        setText('');
    }

    return (
        <Fragment>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/user/${user}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">{text}</p>
                </div>
            </div>

            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1">
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
                        value={commentText}
                        onChange={handleChange}
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" onClick={handleSubmit} />
                </form>
            </div>

            <div className="comments">
                {props.posts.loading ? <Spinner /> : comments && comments.map(comment => {
                    return (
                        <div className="post bg-white p-1 my-1" key={comment._id}>
                            <div>
                                <Link to={`/profile/user/${comment.user}`}>
                                    <img
                                        className="round-img"
                                        src={comment.avatar}
                                        alt="commenter avatar"
                                    />
                                    <h4>{comment.name}</h4>
                                </Link>
                            </div>
                            <div>
                                <p className="my-1">{comment.text}</p>
                                <p className="post-date">
                                    Commented on <Moment format='MM/DD/YYYY'>{comment.date}</Moment>
                                </p>
                                {props.auth.user && comment.user === props.auth.user._id &&
                                <button type="button" className="btn btn-danger" onClick={() => props.deleteComment(_id, comment._id)}>
                                    <i className="fas fa-times"></i>
                                </button>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

Post.propTypes = {
    post: PropTypes.object,
    posts: PropTypes.object,
    auth: PropTypes.object,
    getPost: PropTypes.func
}

function mapStateToProps(state) {
    return {
        post: state.posts.post,
        posts: state.posts,
        auth: state.auth
    }
}

const mapDispatchToProps = {
    getPost,
    addComment,
    deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);