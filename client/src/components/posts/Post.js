import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getPost, addComment } from '../../actions/posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Post(props) {

    useEffect(() => {
        props.getPost(props.match.params.id);
    }, [props.getPost]);
    
    let { user, postText, avatar, _id, name, likes, comments } = props.post;

    let [text, setText] = useState('');

    function handleChange(event) {
        setText(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addComment(_id, {text});
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
                    <p className="my-1">{postText}</p>
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
                        value={text}
                        onChange={handleChange}
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" onClick={handleSubmit}/>
                </form>
            </div>

            <div className="comments">
                <div className="post bg-white p-1 my-1">
                    <div>
                        <a href="profile.html">
                            <img
                                className="round-img"
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                alt=""
                            />
                            <h4>John Doe</h4>
                        </a>
                    </div>
                    <div>
                        <p className="my-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                            possimus corporis sunt necessitatibus! Minus nesciunt soluta
                            suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                            dolor? Illo perferendis eveniet cum cupiditate aliquam?
                        </p>
                        <p className="post-date">
                            Commented on 04/16/2019
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Post.propTypes = {
    post: PropTypes.object,
    getPost: PropTypes.func
}

function mapStateToProps(state) {
    return {
        post: state.posts.post
    }
}

export default connect(mapStateToProps, { getPost, addComment })(Post);