import React, { Fragment, useEffect } from 'react';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Profile(props) {

    useEffect(() => {
        props.getProfileById(props.match.params.id);
    }, []);

    return (
        <Fragment>
            {props.profile.loading || props.profile.profile == null ?
                <Spinner />
                :
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back to Profiles
                    </Link>
                    {props.auth.isAuthenticated && !props.auth.loading && 
                    props.auth.user._id === props.profile.profile.user._id
                    &&
                    <Link to='/edit-profile' className='btn btn-dark'>
                        Edit Profile
                    </Link>
                    }

                    <div className="profile-grid my-1">
                        <ProfileTop/>
                        <ProfileAbout/>
                        <ProfileExperience/>
                        <ProfileEducation/>
                        {props.profile.profile.githubusername && <ProfileGithub githubUser={props.profile.profile.githubusername}/>}
                    </div>
                </Fragment>
                
            }
        </Fragment>
    )
}


Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object,
    auth: PropTypes.object
}

function mapStateToProps(state) {
    return {
        profile: state.profile,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { getProfileById })(Profile);
