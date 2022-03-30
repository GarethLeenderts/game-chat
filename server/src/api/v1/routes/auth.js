const express = require('express');
// const { 
//     registerUser,
//     loginUser,
//     // logout,
//     // forgotPassword,
//     // resetPassword,
//  } = require('../controllers/auth');

 const {
    registerWithPassword,
    registerWithGoogle,
    registerWithLinkedin,
    registerWithGithub,
    registerWithFacebook,
    loginWithPassword,
    loginWithGoogle,
    loginWithLinkedin,
    loginWithGithub,
    loginWithFacebook,
    logout,
    forgotPassword,
    resetPassword
 } = require('../controllers/auth');

 const {
     checkIfUserExists,
     checkAuthenticated
 } = require('../middlewares/auth');

const router = express.Router();

// const { protectRoute } = require('../middlewares/auth');

// router.get('/register')
// router.post('/register/:strategy', checkAuthenticated, checkIfUserExists, registerUser);
// router.post('/login/:strategy', checkAuthenticated, loginUser);

router.post('/register', checkAuthenticated, checkIfUserExists, registerWithPassword);
// router.post('/register/oauth/google', checkAuthenticated, checkIfUserExists, registerWithGoogle);
router.post('/register/oauth/linkedin', checkAuthenticated, checkIfUserExists, registerWithLinkedin);
router.post('/register/oauth/github', checkAuthenticated, checkIfUserExists, registerWithGithub);
router.post('/register/oauth/facebook', checkAuthenticated, checkIfUserExists, registerWithFacebook);

router.get('/register/oauth/google', registerWithGoogle);

router.post('/login', checkAuthenticated, loginWithPassword);
router.post('/login/oauth/google', checkAuthenticated, loginWithGoogle);
router.post('/login/oauth/linkedin', checkAuthenticated, loginWithLinkedin);
router.post('/login/oauth/github', checkAuthenticated, loginWithGithub);
router.post('/login/oauth/facebook', checkAuthenticated, loginWithFacebook);
module.exports = router;