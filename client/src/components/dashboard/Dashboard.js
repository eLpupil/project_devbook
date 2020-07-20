import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

// Private Component

function Dashboard(props) {

    useEffect(() => {
        props.getCurrentProfile();
    }, []);


    if (props.profile.loading && props.profile.profile == null) {
        return <Spinner />;
    } else {
        return (
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className='fas fa-user'></i> Welcome {props.auth.user && props.auth.user.name}
                </p>
                {props.profile.profile !== null ?
                    <Fragment>
                        <DashboardActions />
                    </Fragment>
                    :
                    <Fragment>
                        <p>You have not set up your profile yet, create a new profile below.</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                    </Fragment>
                }
            </Fragment>
        )
    }

}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        profile: state.profile,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
