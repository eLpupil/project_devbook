import React, { useState, Fragment } from 'react';
import { addExperience } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

function AddExperience(props) {

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        current: false,
        to: '',
        descripton: ''
    })

    let { title, company, location, from, current, to, description } = formData;

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleCheck(event) {
        setFormData({
            ...formData,
            [event.target.name]: !current
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addExperience(formData, props.history);
    }
    
    return (
        <Fragment className='container'>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit} >
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" onChange={handleChange} value={title} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" onChange={handleChange} value={company} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" onChange={handleChange} value={location} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" onChange={handleChange} value={from} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" onChange={handleCheck} value={current} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" onChange={handleChange} value={to} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        onChange={handleChange}
                        value={description}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(AddExperience);