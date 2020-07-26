import React, { useEffect, Fragment } from 'react';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Profiles(props) {

    useEffect(() => {
        props.getProfiles();
    }, []);

    return (
        <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                Browse and connect with developers
            </p>
            {props.profile.loading ?
                <Spinner />
                :
                <div className="profiles">
                    {props.profile.profiles.map((profile, index) => {
                        return <ProfileItem profile={profile} key={index}/>
                    })}
                </div>
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func,
    profile: PropTypes.object
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, { getProfiles })(Profiles);