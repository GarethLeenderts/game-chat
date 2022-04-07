const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const { generateUniqueUsername } = require('../services/users');
const User = require('../models/User');

// const {
//     registerWithPassword,/
//     registerWithGoogle,
//     registerWithLinkedin,
//     registerWithGithub,
//     registerWithFacebook
// } = require('../services/auth');

const {
    googleOauthHandler, getGoogleOauthTokens, getGoogleUser, createSession
} = require('../services/auth');

// const accessTokenCookieOptions = {
//     maxAge: 900000, // 15 mins
//     httpOnly: true,
//     domain: "localhost",
//     path: "/",
//     sameSite: "lax",
//     secure: false,
//   };
  
//   const refreshTokenCookieOptions = {
//     ...accessTokenCookieOptions,
//     maxAge: 3.154e10, // 1 year
//   };

// Register Users
// Registration flow:
//     Attempt to register, checkifAlreadyLoggedIn, checkIfUserExists,
//     makeSurePasswordSecure(ie. at least one number and one special character),
//     hashPassword, saveNewUser, redirectToLogin (or log user in automatically)


exports.registerWithPassword = async (req, res, next) => {
    // 1. Check username and password availability
    // 2. Hash password
    // 3. Save user to DB
    // 4. Create session on DB/session store
    // 5. Send session cookie to the user
    // 6. Redirect user on the frontend

    const { username, email, password} = req.body;

    try {
        // Check if username exists
        if (username == ""){
            const username = await generateUniqueUsername();
            const userNameExists = false;
        } else {
            const usernameExists = await User.exists({ username });
        };

        // Check if email exists
        const emailExists = await User.exists({ email });

        if (emailExists === true || usernameExists === true){
            return res.json({
                message: 'Username or email unavailable',
                emailUnavailable: emailExists,
                usernameUnavailable: usernameExists,
            });
        };
    
    
        const saltRounds = 10;
        const hashedPassword = bcrypt(password, saltRounds);
    
        // add user to database
        // note: const user = await User.create({userId: id})
        // is equivalent to these 2 lines::
        //    const user = new User({userId: id});
        //    await user.save();
        const user = new User({
            _id: new mongoose.Types.ObjectId(), //new mongoose.Types.ObjectId().toHexString()
            username,
            email,
            password: hashedPassword,
            role: 'user',
        });
        await user.save();

        // create session
        // const session = await createSession();
        req.session.user_id = user._id;
        req.session.username = user.username;
        req.session.role = user.role;
        // req.session.user_slug = user.user_slug;
        // const sessionData = {
        //     user_id: user._id,
        //     username: user.username,
        //     user_slug: user.user_slug
        // };
        // req.session = sessionData;
        // req.session.save((err) => {console.log(err)});
    
        // res.status(200);
        // res.json({message: "New user created"});
        // res.redirect('/login');

        // redirect the client
        const clientEndpoint = `http://localhost:3000/${user.username}`;
        res.redirect(clientEndpoint);
        
    } catch (error) {
        console.log(error);
        res.json({message: "Something went wrong"});
    }
    
}

// exports.registerWithGoogle2 = async (req, res, next) => {
//     // const googleCredentials = await googleOauthHandler();

//     // get code from query string
//     const code = req.query.code; // will be a string

//     // get id and access token with the code
//     const { id_token, access_token } = await getGoogleOauthTokens({ code });

//     // get user with tokens
//     // const isVerified = jwt.verify(id_token);
//     // const googleUser = jwt.decode(id_token);
//     // const googleUser = await getGoogleUser({ id_token, access_token });
//     const googleUser = await getGoogleUser(id_token, access_token);

//     if (!googleUser.verified_email) {
//         return res.status(403).send('Google account is not verified');
//     }

//     // upsert user
//     // find user by email and google_id
//     const emailExists = await User.findOne({email: googleUser.email});
//     const googleUserExists = await User.findOne({google_id: googleUser.id});

//     if (emailExists || googleUserExists) {
//         return res.status(403).send('User already exists');
//     }

//     // User model from Models
//     const user = User.create({
//         email: googleUser.email,
//         username: googleUser.name,
//         picture: googleUser.picture,
//         google_id: googleUser.id,
//         google_email: googleUser.email
//     });

//     // create session
//     const session = await createSession(user._id, req.get('user-agent') || '');

//     // create access and refresh tokens
//     // const access_token = jwt.sign(object, privateKey, options);
//     const accessToken = jwt.sign({...user.toJSON(), session: session._id}, 
//                                    privateKey, 
//                                    {
//                                        expiresIn: process.env.ACCESS_TOKEN_TTL, // 15 minutes
//                                        algorithm: "RS256"
//                                     }); // needs editing
   
   
//     const refreshToken = jwt.sign({...user.toJSON(), session: session._id}, 
//                                    privateKey, 
//                                    {
//                                        expiresIn: process.env.REFRESH_TOKEN_TTL, // 1 year
//                                        algorithm: "RS256"
//                                     }); // needs editing
    


//     // set cookies
//     res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    
//     res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

//     // redirect back to the client
//     const clientEndpoint = "http://localhost:3000";
//     res.redirect(clientEndpoint);

// }

exports.registerWithGoogle = async (req, res, next) => {
    // 1. Get Google OAuth code from query string
    // 2. Use code to get id_token and access_token
    // 3. Get googleUser information by verifying and decoding the id_token(it's a JWT)
    //    3.2 Can also get googleUser via a network request using the id_token and access_token
    // 4. Check if googleUser's email has been verified by google
    // 5. Check if emailExists and if googleUserId exists in DB
    // 6. Create User in DB
    // 7. Create session in session store/DB
    // 8. Send session cookie back to the client
    // 9. Redirect user

    try {
        // get code from query string
        const code = req.query.code; // will be a string
        console.log(`code: ${code}`);
        console.log("///////////////////////////////////");
        console.log("///////////////////////////////////");

        // get id and access token with the code
        const { id_token, access_token } = await getGoogleOauthTokens({ code });

        console.log(`id_token: ${id_token}`);
        console.log("///////////////////////////////////");
        console.log("///////////////////////////////////");
        console.log(`access_token: ${access_token}`);
        console.log("///////////////////////////////////");
        console.log("///////////////////////////////////");

        // get user with tokens
        // const isVerified = jwt.verify(id_token, 'some kind of private key'); // don't have access to the private key
        // const googleUser = jwt.decode(id_token);
        const googleUser = await getGoogleUser(id_token, access_token);
        // console.log(googleUser);
        // res.send({googleUser});
        // console.log("///////////////////////////////////");
        // console.log("///////////////////////////////////");

        if (googleUser.verified_email === false) {
            return res.status(403).send('Google account is not verified');
        };

        // find user by email and/or google_id
        // const emailExists = await User.findOne({email: googleUser.email});
        // const googleUserExists = await User.findOne({google_id: googleUser.id});
        const emailExists = await User.exists({email: googleUser.email});
        const googleUserExists = await User.exists({google_id: googleUser.id});

        if (emailExists || googleUserExists) {
            return res.status(403).send('User already exists');
        };

        const formattedUsername = googleUser.name.split(' ').join('');
        // User model from Models
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            email: googleUser.email,
            username: formattedUsername,
            picture: googleUser.picture,
            google_id: googleUser.id,
            google_email: googleUser.email,
            role: 'user',
        });
        // const user = new User({
        //     _id: new mongoose.Types.ObjectId(),
        //     email: googleUser.email,
        //     username: googleUser.name,
        //     picture: googleUser.picture,
        //     google_id: googleUser.id,
        //     google_email: googleUser.email,
        //     role: 'user',
        // });
        // await user.save();

        // create session
        // const session = await createSession();
        req.session.user_id = user._id;
        req.session.username = user.username;
        req.session.role = user.role;

        // redirect the client
        // const clientRoot = process.env.CLIENT_DOMAIN;
        // const clientEndpoint = `${clientRoot}/${user.username}`;
        const clientEndpoint = `http://localhost:3000/${user.username}`;
        res.redirect(clientEndpoint);
    } catch (error) {
        console.log(error);
    };
};
// exports.registerWithLinkedin = async (req, res, next) => {

// }
// exports.registerWithGithub = async (req, res, next) => {

// }
// exports.registerWithFacebook = async (req, res, next) => {

// }


// Login Users
// Login flow: 
//      Attempt to login, checkIfAlreadyLoggedIn, checkIfUserExists,
//      checkPassword, createSession, sendSessionCookie
//      OR use JWT instead of sessions

exports.loginWithPassword = async (req, res, next) => {
    // 1. Find user based on email or username
    //    1.2 If user doesn't exist: return 'user with ${email} doesn't exist
    // 2. Compare password with hashed password in DB(using bcrypt.compare())
    // 3. If successful: 
    //    3.1 create a new session
    //    3.2 redirect user to http://localhost:3000/:username
    
    // loginIdentifier = username or email
    const { loginIdentifier, password } = req.body;

    // const user = await User.$where(`this.email === ${loginIdentifier} || this.username === ${loginIdentifier}`);
    // const user = await User.or([{ email: loginIdentifier }, { username: loginIdentifier }]);

    try {
        // const user = await User.findOne({email: loginIdentifier});
        // // if can't match email, try match username
        // if (!user){
        //     user = await User.findOne({username: loginIdentifier});
            
        //     // if can't match username, we now know that the user doesn't exist
        //     if (!user){
        //         return res.status(403).json({message: "User doesn't exists. Please register."})
        //             .redirect("http://localhost:3000/register");
        //     }
        // }
        const user = await User.or([{ email: loginIdentifier }, { username: loginIdentifier }]);

        if (!user){
            return res.status(403).json({message: "User doesn't exists. Please register."})
                .redirect("http://localhost:3000/register");
        };

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            return res.status(403).json({message: "Password incorrect. Please try again"})
        }

        // create session
        req.session.user_id = user._id;
        req.session.username = user.username;
        req.session.role = user.role;

        // redirect the client
        const clientEndpoint = `http://localhost:3000/${user.username}`;
        res.redirect(clientEndpoint);
    } catch (error) {
        console.log(error);
    };
};

exports.loginWithGoogle = async (req, res, next) => {
    // 1. get code from query string
    // 2. use code to get id_token and access token from Google OAuth
    // 3. verify the id_token jwt and decode it
    // 4. find user by matching google_id or google_email
    // 5. If successful:
    //    5.1 create a new session
    //    5.2 redirect user to http://localhost:3000/:username

    try {
        // get code from query string
        const code = req.query.code; // will be a string

        // get id and access token with the code
        const { id_token, access_token } = await getGoogleOauthTokens({ code });

        // get user with tokens
        const isVerified = jwt.verify(id_token);
        if (!isVerified){
            return res.json({message: 'User not verified. id_token has been tampered with'});
        }
        const googleUser = jwt.decode(id_token);


        // find user by email or google_id
        const user = await User.findOne({google_email: googleUser.email});
        // const user = await User.findOne({google_id: googleUser.id});

        if (!user) {
            return res.status(403).json({message: "User doesn't exists. Please register."})
            .redirect("http://localhost:3000/register");
        };

        // create session
        req.session.user_id = user._id;
        req.session.username = user.username;
        req.session.role = user.role;

        // redirect the client
        const clientEndpoint = `http://localhost:3000/${user.username}`;
        res.redirect(clientEndpoint);
    } catch (error) {
        console.log(error);
    };
};
// exports.loginWithLinkedin = async (req, res, next) => {

// }
// exports.loginWithGithub = async (req, res, next) => {

// }
// exports.loginWithFacebook = async (req, res, next) => {

// }
// Register New Authentication Strategy
// For when a user would like to be able to login to their account using several different methods. 
// A new strategy may only be registered if the user is logged in.
// Strategies = ['password', 'google', 'linkedin', 'github', 'facebook']
// Register New Strategy Flow:
//     checkUserAuthorisation, compareEmailToOtherEmails, checkEmailDoesNotExistForAnotherUser,
//     updateUserDetailsWithNewStrategy

exports.addPasswordLogin = async (req, res, next) => {
    // 1. get user._id from session
    // 2. find that user in DB
    // 3. hash entered password
    // 4. if user password is empty: set password to our entered password
    // 5. if all successful: respond with success message

    try {
        const { password } = req.password;

        let user = User.findOne({ _id: req.session.user_id });

        if (!user) {
            return res.status(403).json({message: "User could not be found in the database!"});
        };

        const saltRounds = 10;
        const hashedPassword = await bcrypt(password, saltRounds);

        user.password = hashedPassword;

        // update user in DB
        await user.save();

        // respond to client
        res.status(200).json({message: "You can now login using your username/email and password!"});
    } catch (error) {
        console.log(error);
    };
};

exports.addGoogleLogin = async (req, res, next) => {
    // 1. get code from query string
    // 2. use code to get id_token and access token from Google OAuth
    // 3. verify the id_token jwt and decode it
    // 4. find user by matching googleUser.email or logged-in user's email
    // 5. If successful:
    //    5.1 Add google_id and google_email to User's model


    try {
        // get code from query string
        const code = req.query.code; // will be a string

        // get id and access token with the code
        const { id_token, access_token } = await getGoogleOauthTokens({ code });

        // get user with tokens
        const isVerified = jwt.verify(id_token);
        if (!isVerified){
            return res.json({message: 'User not verified. id_token has been tampered with'});
        }
        const googleUser = jwt.decode(id_token);

        // find user by email or google_id
        const user = await User.findOne({_id: req.session.user_id});
        // const user = await User.findOne({google_id: googleUser.id});

        if (!user) {
            return res.status(403).json({message: "User doesn't exists. Please register."})
            .redirect("http://localhost:3000/register");
        };
        
        if (user.email !== googleUser.email) {
            return res.status(403).json({message: "Google account email doesn't match your email. Please make sure they match."});
            // .redirect("http://localhost:3000/register");
        };

        user.google_email = googleUser.email;
        user.google_id = googleUser.id;

        if (!user.picture) {
            user.picture = googleUser.picture;
        };

        await user.save();

        // create session
        // req.session.user_id = user._id;
        // req.session.username = user.username;
        // req.session.role = user.role;

        // redirect the client
        // const clientEndpoint = `http://localhost:3000/${user.username}`;
        // res.redirect(clientEndpoint);

        res.status(200).json({message: "You can now login to our app with Google!"});
    } catch (error) {
        console.log(error);
    };
};



// OTHER FUNCTIONALITY
exports.resetPassword = async (req, res, next) => {

};
exports.forgotPassword = async (req, res, next) => {

};
exports.confirmEmail = async (req, res, next) => {

};
exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('http://localhost:3000/login').res.json({message: "You have successfully logged out."});
};