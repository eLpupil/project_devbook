const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   GET api/users
// @desc    Test route
// @access  PUBLIC
router.get('/', (req, res) => { res.send('user route') });

// @route   POST api/users
// @desc    Register user
// @access  PUBLIC
router.post('/', 
    [
    check('name', 'Please enter a name').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be at least 8 characters').isLength({ min: 8 })
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'Email already registered' }] });
            }

            const avatar = await gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                password,
                avatar
            })

            user.password = await bcrypt.hash(password, 10);
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            let token = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 });
            res.send({ "token": token });

        } catch (error) {
            res.status(500).send('Server error');
        }
    })

module.exports = router;