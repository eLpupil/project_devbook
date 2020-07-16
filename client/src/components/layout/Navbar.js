import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logout } from '../../actions/auth';

function Navbar(props) {

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    
    const authLinks = (
        <ul>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user'></i>
                    <span className="hide-sm"> Dashboard</span>
                </Link>
            </li>
            <li><Link to="/profiles">Developers</Link></li> 
            <li>
                <Link to="/" onClick={props.logout}>
                    <i className='fas fa-sign-out-alt'></i>
                    <span className='hide-sm'> Logout</span>
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevBook</Link>
            </h1>
            { !props.isLoading ? (props.isAuthenticated ? authLinks: guestLinks) : null }
        </nav>
    )
}

Navbar.propTypes = {
    isAuthenticated: propTypes.bool,
    logout: propTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.loading
    }
}

export default connect(mapStateToProps, { logout })(Navbar);