import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ProfileAbout(props) {

    const { user: { name }, skills, bio } = props.profile;

    return (
        <div className="profile-about bg-light p-2">
            {bio &&
                (<Fragment>
                    <h2 className="text-primary">{name.split(' ')[0] + "'s Bio"}</h2>
                    <p>{bio}</p>
                <div className="line"></div>
                </Fragment>)
            }
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {skills.map((skill, idx) => {
                    return <div key={idx} className="p-1"><i className="fa fa-check"></i> {skill}</div>
                })}
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object
}

function mapStateToProps(state) {
    return {
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps)(ProfileAbout);