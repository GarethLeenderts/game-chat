const mongoose = require('mongoose');

exports.checkIfUserExists = async (req, res, next) => {
    // check database to check of email or username already exist
    const { registrationStrategy } = req.params;

    if (registrationStrategy === 'password') {
        const { username, email, password } = req.body;

        if (username === "") {
            // const username = generateUniqueUsername();
            res.json({message: `Please add a username`});
        } else {

            const users = await mongoose.findby(username);
            if (users.length !== 0) {
                res.json({message: `Username ${username} already exists`});
            }
        }

    } 
    else if (registrationStrategy === 'google') {
        const googleCredentials = req.body;
        const email = googleCredentials.email;
    }
    else if (registrationStrategy === 'linkedin') {
        const linkedinCredentials = req.body;
        const email = linkedinCredentials.email;
    }
    else if (registrationStrategy === 'github') {
        const githubCredentials = req.body;
        const email = githubCredentials.email;
    }
    else if (registrationStrategy === 'facebook') {
        const facebookCredentials = req.body;
        const email = facebookCredentials.email;
    }

    // const Users = await mongoose.findByEmail(email);
    // if (Users.length !== 0) {
    //     res.json({message: `User with email ${email} already exists`});
    // } else {
    //     next();
    // }
};