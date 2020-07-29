import React, { Fragment, useEffect } from 'react';
import { getGithub } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import PropTypes from 'prop-types';

function ProfileGithub(props) {


    useEffect(() => {
        props.getGithub(props.githubUser);
    }, [props.getGithub])

    return (
        <Fragment>
            <div className="profile-github">
                <h2 className="text-primary my-1">
                    <i className="fab fa-github"></i> Github Repos
                </h2>
                {props.repos === null ? <Spinner/>
                :
                props.repos.map(repo => {
                    return (
                        <div className="repo bg-white p-1 my-1" key={repo.id}>
                            <div>
                                <h4>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                                </h4>
                                <p>{repo.description}</p>
                            </div>
                            <div>
                                <ul>
                                    <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                                    <li className="badge badge-dark">Watchers: {repo.watchers}</li>
                                    <li className="badge badge-light">Forks: {repo.forks}</li>
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

ProfileGithub.propTypes = {
    repos: PropTypes.array,
    githubUser: PropTypes.string,
    getGithub: PropTypes.func
}

function mapStateToProps(state) {
    return {
        repos: state.profile.repos
    }
}

export default connect(mapStateToProps, { getGithub })(ProfileGithub);