const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/user');
const request = require('request');
const config = require('config');

// @route   GET /api/profile/me
// @desc    Get current users profile
// @access  PRIVATE
router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] })
    }

});

// @route   POST /api/profile
// @desc    Create or Update user profile
// @access  PRIVATE
router.post('/', [auth,
    [
        check('status', 'Status is required').notEmpty(),
        check('skills', 'Skills is required').notEmpty(),
    ]
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubusername,
            youtube,
            twitter,
            facebook,
            linkedin,
            instagram
        } = req.body;

        // Build profile object // @todo bug if field is empty, won't update
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (status) profileFields.status = status;
        if (bio) profileFields.bio = bio;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim());

        profileFields.social = {};
        profileFields.social.youtube = youtube;
        profileFields.social.twitter = twitter;
        profileFields.social.facebook = facebook;
        profileFields.social.linkedin = linkedin;
        profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, useFindAndModify: false });

            if (!profile) {
                let profile = new Profile(profileFields);
                await profile.save();
            }

            res.send(profile); // not sending back after new profile created

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }

    })

// @route   GET /api/profile
// @desc    Get all profiles
// @access  PUBLIC
router.get('/', async (req, res) => {
    try {
        let profiles = await Profile.find().populate('user', ['name', 'avatar']);

        if (!profiles) {
            return res.json({ msg: 'There are no profiles' });
        }

        res.json(profiles);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: [{ msg: 'There are no profiles' }] });
    }
})

// @route   GET /api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  PUBLIC
router.get('/user/:user_id', async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.json({ msg: 'Profile not found' });
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.json({ msg: 'Profile not found' });
        }
        res.status(500).send({ msg: 'Server error' });
    }
})

// @route   DELETE /api/profile/me
// @desc    Delete profile, user & posts
// @access  PRIVATE
router.delete('/me', auth, async (req, res) => {
    try {
        // delete profile
        await Profile.findOneAndRemove({ user: req.user.id }, { useFindAndModify: false });
        // delete user
        await User.findOneAndRemove({ _id: req.user.id }, { useFindAndModify: false });
        // @todo - delete posts

        res.status(200).json({ msg: 'User has been deleted' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ msg: 'Server error' });
    }
})

// @route PUT /api/profile/experience
// @desc Add experience to profile
// @access PRIVATE
router.put('/experience', [auth, [
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('from', 'Start date is required').notEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, company, location, from, to, current, description } = req.body;

        let newExp = { title, company, location, from, to, current, description };

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);
            await profile.save();

            // res.json({ msg: 'Experience added' })
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ msg: 'Server error' });
        }

    }
)

// @route   DELETE /api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  PRIVATE
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $pull: { experience: { _id: req.params.exp_id } } },
            { new: true, useFindAndModify: false });
            
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: 'Server error' });
    }
}) 

// @route   PUT /api/profile/education
// @desc    Add education to profile
// @access  PRIVATE
router.put('/education', [ auth, [
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of Study is required').notEmpty(),
    check('from', 'From date is required').notEmpty()
    ] ], 
    async (req, res) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { school, degree, fieldofstudy, from, to, current, description } = req.body;

        let newEducation = {};
        if(school) newEducation.school = school;
        if(degree) newEducation.degree = degree;
        if(fieldofstudy) newEducation.fieldofstudy = fieldofstudy;
        if(from) newEducation.from = from;
        if(to) newEducation.to = to;
        if(current) newEducation.current = current;
        if(description) newEducation.description = description;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEducation);

            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server error' });
        }

    }
)

// @route   DELETE /api/profile/education/:edu_id
// @desc    Delete an education from profile 
// @access  PRIVATE
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $pull: { education: { _id: req.params.edu_id } } },
            { new: true, useFindAndModify: false });

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
})

// @route   GET /api/profile/github/:username
// @desc    Get github repos for user profile
// @access  PUBLIC 
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${
                req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                'githubClientId'
            )}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' },
            json: true 
        };
    
        request(options, (err, response, body) => {
            
            if (err) { console.log(err) };
            
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'Github user not found' });
            }

            res.json(body);
        });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
})

module.exports = router;