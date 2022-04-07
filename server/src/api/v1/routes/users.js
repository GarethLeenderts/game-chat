const express = require('express');

const { getUserData } = require('../controllers/users');

const router = express.Router();

// router.post('/auth/register/:strategy', )
router.get('/:username', getUserData);

module.exports = router;