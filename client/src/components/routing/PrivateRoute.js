import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


function PrivateRoute(props) {
    if (props.isAuthenticated) {
        return <Route path='/dashboard' component={props.component}/>
    }

    return <Redirect to='/login' /> 
}

PrivateRoute.propTypes = {
    isAuthenticated: propTypes.bool
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(PrivateRoute);