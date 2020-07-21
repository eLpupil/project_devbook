import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Experience(props) {
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

                    {props.experiences.map(exp => {
                        return (
                            <tr key={exp._id}>
                                <td>{exp.company}</td>
                                <td className="hide-sm">{exp.title}</td>
                                <td className="hide-sm">
                                    {exp.from + ' - ' + (exp.to && !exp.current ? exp.to : 'Now')}
                                 </td>
                                <td>
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experiences: PropTypes.array
}

function mapStateToProps(state) {
    return {
        experiences: state.profile.profile.experience
    }
}

export default connect(mapStateToProps)(Experience);