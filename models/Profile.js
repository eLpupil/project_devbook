const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    // User model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    // Bio
    company: String,
    website: String,
    location: String,
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: String,
    githubusername: String,

    // Experience
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: String,
            from : {
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: String
        }
    ],

    // Education
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: true
            },
            current: {
                type: Boolean,
                default: false
            },
            description: String
        }
    ],

    // Social Media
    social: {
        youtube: String,
        twitter: String,
        facebook: String,
        linkedin: String,
        instagram: String
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

const Profile = mongoose.model('profile', ProfileSchema, 'profiles');

module.exports = Profile;