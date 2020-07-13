const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Return user data
// @access  PRIVATE
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  PUBLIC
// @todo make email check case insensitive!
router.post('/', 
    [
    check('email', 'Please enter valid email').exists().isEmail(),
    check('password', 'Password cannot be empty').notEmpty()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentails' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            const token = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 });
            res.send({ "token": token });

        } catch (error) {
            res.status(500).json({ errors: [{ msg: 'Server Error' }] })
        }

    })

module.exports = router;