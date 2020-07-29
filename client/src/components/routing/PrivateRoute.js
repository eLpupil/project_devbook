import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


function PrivateRoute({ component: Component, auth: { isAuthenticated, loading }, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if ((!isAuthenticated && !loading) ) {
                return <Redirect to='/login' />;
            }
            else {
                return <Component {...props} />
            }
        }} />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: propTypes.bool
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute);