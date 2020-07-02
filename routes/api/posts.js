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
            res.json({ errors: errors.array() });
        }

        try {
            let queriedUser = await User.findById(req.user.id);
            const { _id, name, avatar } = queriedUser;
            
            const { text } = req.body;
    
            let postFields = { 
                user: _id,
                text,
                name,
                avatar
             };

            let post = await new Post(postFields);
            await post.save();
            res.json({ msg: 'Post added' });

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server error '});
        }
        
    }
)
module.exports = router;