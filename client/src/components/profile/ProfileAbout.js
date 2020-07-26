import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ProfileAbout(props) {

    const { user: { name }, skills, bio } = props.profile;

    return (
        <div class="profile-about bg-light p-2">
            {bio ?
                (<Fragment>
                    <h2 class="text-primary">{name.split(' ')[0] + "'s Bio"}</h2>
                    <p>{bio}</p>
                </Fragment>)
                :
                <p>Bio: 404 :^)</p>
            }
            <div class="line"></div>
            <h2 class="text-primary">Skill Set</h2>
            <div class="skills">
                {skills.map((skill, idx) => {
                    return <div class="p-1"><i class="fa fa-check"></i> {skill}</div>
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