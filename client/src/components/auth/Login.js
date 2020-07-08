import React, { Fragment, useState } from 'react';
import axios from 'axios';

function Login() {

    let [ formData, setFormData ] = useState({
        email: '',
        password: ''
    })

    let { email, password } = formData;

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('SUCCESS');
        // try {
        //     let data = { email, password };
    
        //     let res = await axios.post('api/auth', data, { headers: { 'Content-Type': 'application/json' } });
        //     console.log(res.data);
            
        // } catch (error) {
        //     console.error(error.response.data);
        // }
    }

    return (
        <Fragment>
            {/* <div className="alert alert-danger">
                Invalid credentials
            </div> */}
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" action="dashboard.html" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <a href="register.html">Sign Up</a>
            </p>
        </Fragment>
    )
}

export default Login;