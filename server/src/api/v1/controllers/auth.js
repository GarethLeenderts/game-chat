const express = require('express');

// const {
//     registerWithPassword,
//     registerWithGoogle,
//     registerWithLinkedin,
//     registerWithGithub,
//     registerWithFacebook
// } = require('../services/auth');

const {
    googleOauthHandler
} = require('../services/auth');

// Register Users
// Registration flow:
//     Attempt to register, checkifAlreadyLoggedIn, checkIfUserExists,
//     makeSurePasswordSecure(ie. at least one number and one special character),
//     hashPassword, saveNewUser, redirectToLogin (or log user in automatically)
// exports.registerUser = async (req, res, next) => {
//     const { registrationStrategy } = req.params;

//     if (registrationStrategy === 'password') {
//         const { email, password } = req.body;

//         await registerWithPassword(email, password);
//     }
//     else if (registrationStrategy === 'google') {
//         const googleCredentials = req.body;

//         await registerWithGoogle(googleCredentials);
//     }
//     // else if (registrationStrategy === 'linkedin') {
//     //     const linkedinCredentials = req.body;

//     //     await registerWithLinkedin(linkedinCredentials);
//     // }
//     // else if (registrationStrategy === 'github') {
//     //     const githubCredentials = req.body;

//     //     await registerWithGithub(githubCredentials);
//     // }
//     // else if (registrationStrategy === 'facebook') {
//     //     const facebookCredentials = req.body;

//     //     await registerWithFacebook(facebookCredentials);
//     // }
// };

exports.registerWithPassword = async (req, res, next) => {
    const { username, email, password} = req.body;

    try {
        let user = User.findOne({ email });
        let userName = User.findOne({ username });
    
        if (user && userName) {
            return res.json({
                message: `Username and email unavailable.`,
                emailAvailable: false, 
                usernameAvailable: false});
        } else if (user === true && userName === false) {
            return res.json({
                message: `User with email ${email} already exists.`,
                emailAvailable: false,
                usernameAvailable: true});
        } else if (user === false && userName === true) {
            return res.json({
                message: `Username ${username} already exists.`,
                emailAvailable: true, 
                usernameAvailable: false});
        }
    
        const saltRounds = 10;
        const hashedPassword = bcrypt(password, saltRounds);
    
        // add user to database
        await User.create({
            username,
            email,
            password: hashedPassword
        });
    
        res.status(200);
        res.json({message: "New user created"});
        res.redirect('/login');
        
    } catch (error) {
        console.log(error);
        res.json({message: "Something went wrong"});
    }
    
}
exports.registerWithGoogle = async (req, res, next) => {
    const googleCredentials = await googleOauthHandler();

}
exports.registerWithLinkedin = async (req, res, next) => {

}
exports.registerWithGithub = async (req, res, next) => {

}
exports.registerWithFacebook = async (req, res, next) => {

}


// Login Users
// Login flow: 
//      Attempt to login, checkIfAlreadyLoggedIn, checkIfUserExists,
//      checkPassword, createSession, sendSessionCookie
//      OR use JWT instead of sessions

exports.loginWithPassword = async (req, res, next) => {
    
}
exports.loginWithGoogle = async (req, res, next) => {

}
exports.loginWithLinkedin = async (req, res, next) => {

}
exports.loginWithGithub = async (req, res, next) => {

}
exports.loginWithFacebook = async (req, res, next) => {

}
// Register New Authentication Strategy
// For when a user would like to be able to login to their account using several different methods. 
// A new strategy may only be registered if the user is logged in.
// Strategies = ['password', 'google', 'linkedin', 'github', 'facebook']
// Register New Strategy Flow:
//     checkUserAuthorisation, compareEmailToOtherEmails, checkEmailDoesNotExistForAnotherUser,
//     updateUserDetailsWithNewStrategy