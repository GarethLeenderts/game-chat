const express = require('express');

const { getUserData } = require('../controllers/users');

const router = express.Router();

// router.post('/auth/register/:strategy', )
router.get('/', getUserData);

module.exports = router;