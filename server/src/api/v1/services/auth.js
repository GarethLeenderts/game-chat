const bcrypt = require('bcrypt');
const axios = require('axios');
const qs = require('qs');

const UserModel = require('../models/User');


exports.registerWithPassword = async (username, email, password) => {
    try {
        saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // const username = generateUniqueUsername(); ///
    
        const user = await User.create({username, email, hashedPassword});
    } catch (error) {
        console.log(error);
    }
};


exports.getGoogleOauthTokens = async ({ code }) => {
    const url = 'https://oauth2.googleapis.com/token';

    const values = {
        code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        // redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL_register,
        grant_type: 'authorization_code',
    };

    try {
        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const res = await axios.post(url, qs.stringify(values), options);

        return res.data;
    } catch (error) {
        console.log("Failed to fetch Google Oauth Token");
        console.log(error);
    }
};

// exports.getGoogleUser = async ({id_token, access_token}) => {
exports.getGoogleUser = async (id_token, access_token) => {
    try {
        const res = await axios.get(
            // `https://www.googleapis/oauth2/v1/userinfo?alt=&access_token=${access_token}`, 
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            { headers: { 
                Authorization: `Bearer ${id_token}`, 
            },
         }
        );

        return res.data;
    } catch (error) {
        console.log("Error fetching Google user.");
        console.log(error);
    }
};

exports.createSession = async (userId, userAgent) => {
    const session = await SessionModel.create({user: userId, userAgent});

    return session.toJSON();
};