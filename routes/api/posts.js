const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const Post = require('../../models/Post');
const { route } = require('./profile');
const { findByIdAndDelete, findOneAndRemove } = require('../../models/user');
const { ObjectId } = require('mongodb');

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

// @route   GET /api/posts
// @desc    Get all posts
// @access  PRIVATe
router.get('/', auth, async (req, res) => {
    try {
        let posts = await Post.find().sort({ date: -1 });
        
        if (!posts) {
            return res.status(404).json({ msg: 'There are no posts' });
        }

        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error '});
    }
})

// @route   GET /api/posts/:post_id
// @desc    Get single post by post ID
// @access  PRIVATE
router.get('/:post_id', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        
        if (!post) {
            return res.status(404).json({ msg: `Error: No post with ID: ${req.params.post_id}` });
        }

        res.json(post);

    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(404).json({ msg: `Error: No post with ID: ${req.params.post_id}` });
        }
        res.status(500).json({ msg: 'Server error' });
    }
})

// @route   DELETE /api/posts/:post_id
// @desc    delete a post by ID 
// @access  PRIVATE
router.delete('/:post_id', auth, async (req, res) => {
    try {

        let post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: `Error: No post with ID: ${req.params.post_id}. Delete failed.` });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: `Error: Post ${req.params.post_id} does not belong to user` });
        }

        await Post.findByIdAndRemove(req.params.post_id, { useFindAndModify: false });

        res.json({ msg: 'Post has been deleted' });

    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(404).json({ msg: `Error: No post with ID: ${req.params.post_id}. Delete failed` });
        }
        res.status(500).json({ msg: 'Server error' });
    }
})

// route for updating likes (like)
// route for updating likes (unlike)

// route for adding comment
// route for removing comment


module.exports = router;