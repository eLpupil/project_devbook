import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';

function Education(props) {

    function handleClick(event) {
        props.deleteEducation(event.target.name);
    }

    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {props.educations ? props.educations.map(edu => {
                        return (
                            <tr key={edu._id}>
                                <td>{edu.school}</td>
                                <td className="hide-sm">{edu.degree}</td>
                                <td className="hide-sm">{edu.from + ' - ' + (edu.to && !edu.current ? edu.to : 'Now')}</td>
                                <td>
                                    <button className="btn btn-danger" name={edu._id} onClick={handleClick} >
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


Education.propTypes = {
    educations: PropTypes.array,
    deleteEducation: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        educations: state.profile.profile.education
    }
}

export default connect(mapStateToProps, { deleteEducation })(Education);