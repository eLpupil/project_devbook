import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
// import axios from 'axios';
import { register } from '../../actions/auth';

function Register(props) {

    let [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    let { name, email, password, password2 } = formData;

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        if (password !== password2) {
            console.log('Passwords do not match')
            props.setAlert('Passwords do not match!', 'danger');
        } else {
            // props.setAlert('Registration Success!', 'success');
            const newUser = {
                name,
                email,
                password
            }
            props.register(newUser);
            

            // try {
            //     let config = {
            //         headers: { 'Content-Type': 'application/json'}
            //     }

            //     let res = await axios.post('api/users', newUser, config);

            //     console.log(res.data);
            // } catch (error) {
            //     console.error(error.response.data);
            // }
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" action="create-profile.html" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name} 
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input 
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={handleChange} />
                    <small className="form-text">
                        This site uses
                        <a href="https://en.gravatar.com/" target='_blank' rel='noopener noreferrer'> Gravatar </a>
                        so if you want a profile image, use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="8"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="8"
                        value={password2}
                        onChange={handleChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )

}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

export default connect(null, { setAlert, register })(Register);