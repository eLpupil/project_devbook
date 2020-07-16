import React, { useState } from 'react';


function CreateProfile() {
    const [formData, setFormData] = useState({
        website: '',
        company: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    let { website, company, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram } = formData;

    function handleChange(event) {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    return (
        <form>
            <input type="text" name="website" value={website} onChange={handleChange} />
            <input type="text" name="company" value={company} onChange={handleChange} />
            <input type="text" name="location" value={location} onChange={handleChange} />
            <input type="text" name="status" value={status} onChange={handleChange} />
            <input type="text" name="skills" value={skills} onChange={handleChange} />
            <input type="text" name="githubusername" value={githubusername} onChange={handleChange} />
            <input type="text" name="bio" value={bio} onChange={handleChange} />
            <input type="text" name="twitter" value={twitter} onChange={handleChange} />
            <input type="text" name="facebook" value={facebook} onChange={handleChange} />
            <input type="text" name="linkedin" value={linkedin} onChange={handleChange} />
            <input type="text" name="youtube" value={youtube} onChange={handleChange} />
            <input type="text" name="instagram" value={instagram} onChange={handleChange} />
        </form>
    )
}

export default CreateProfile;