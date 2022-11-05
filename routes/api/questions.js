const express = require('express');
const router = express.Router();

// @route GET api/questions
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Questions route'));

module.exports = router;