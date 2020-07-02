const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const Post = require('../../models/Post');

// @route   POST /api/posts
// @desc    Add new post 
// @access  PRIVATE
router.post('/',
    [auth,
        [
            check('text', 'Post cannot be empty').notEmpty()
        ]
    ], 
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findById(req.user.id).select('-password');
            
            let postFields = { 
                user: req.user.id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar
             };

            let post = new Post(postFields);
            await post.save();
            res.json({ msg: 'Post added', post });

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server error '});
        }
        
    }
)

// route for getting all posts
// route for getting post by ID
// route for deleting a post
module.exports = router;