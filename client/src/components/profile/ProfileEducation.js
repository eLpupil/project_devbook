import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ProfileEducation(props) {

    return (
        props.educations.length > 0
        ?
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {props.educations.map((edu, idx) => {
                return (
                    <div key={idx} >
                        <h3>{edu.school}</h3>
                        <p>{edu.from} - {edu.to ? edu.to : 'Now'}</p>
                        <p><strong>Degree: </strong>J{edu.degree}</p>
                        <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                        <p>
                            <strong>Description: </strong>{edu.description}
                        </p>
                    </div>
                )
            })}
        </div>
        :
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>        
            <p>Education: 404 :^)</p>
        </div>
    )

}

ProfileEducation.propTypes = {
    educations: PropTypes.array
}

function mapStateToProps(state) {
    return {
        educations: state.profile.profile.education
    }
}

export default connect(mapStateToProps)(ProfileEducation);