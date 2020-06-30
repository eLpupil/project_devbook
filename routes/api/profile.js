const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/user');

// @route   GET /api/profile/me
// @desc    Get current users profile
// @access  PRIVATE
router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']); // research this

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

        if(!errors.isEmpty()) {
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

        // Build profile object
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
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;
        
        try {
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields }, 
                { new: true, useFindAndModify: false });

            if (!profile) {
                let profile = new Profile(profileFields);
                await profile.save();
            }

            res.send(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }        

    })

module.exports = router;