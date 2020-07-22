import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExperience } from '../../actions/profile';

function Experience(props) {

    function handleClick(event) {
        props.deleteExperience(event.target.value);
    }

    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {props.experiences ? props.experiences.map(exp => {
                        return (
                            <tr key={exp._id}>
                                <td>{exp.company}</td>
                                <td className="hide-sm">{exp.title}</td>
                                <td className="hide-sm">
                                    {exp.from + ' - ' + (exp.to && !exp.current ? exp.to : 'Now')}
                                 </td>
                                <td>
                                    <button className="btn btn-danger" value={exp._id} onClick={handleClick} >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }) : null }


                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experiences: PropTypes.array,
    deleteExperience: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        experiences: state.profile.profile.experience
    }
}

export default connect(mapStateToProps, { deleteExperience })(Experience);