const express = require('express');
const router = express.Router();

// @route   GET /api/profiles
// @desc    Test route
// @access  PUBLIC
router.get('/', (req, res) => res.send('posts route'));

module.exports = router;