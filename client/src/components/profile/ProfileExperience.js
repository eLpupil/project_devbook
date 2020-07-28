import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ProfileExperience(props) {

    return (
        props.experiences.length > 0
        ?
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {props.experiences.map((exp, idx) => {
                return (
                    <div key={idx} >
                        <h3 className="text-dark">{exp.company}</h3>
                        <p>{exp.from + ' - ' + exp.to ? exp.to : 'Now'}</p>
                        <p><strong>Position: </strong>{exp.title}</p>
                        <p>
                            <strong>Description: </strong>
                            {exp.description}
                        </p>
                    </div>
                )
            })}
        </div>
        :
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            <p>Experience: 404 :^). Perhaps take a look at the Github repos :)</p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array
}

function mapStateToProps(state) {
    return {
        experiences: state.profile.profile.experience
    }
}

export default connect(mapStateToProps)(ProfileExperience);