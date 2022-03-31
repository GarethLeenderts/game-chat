// npm install unique-username-generator --save
const genUsername = require("unique-username-generator");
const User = require('../models/User');

exports.generateUniqueUsername = async () => {
    let username = genUsername.generateUsername("-",6);

    let usernameIsUnique = false;
    while (!usernameUnique) {
        let user = await User.findOne({ username });

        if (!user){
            usernameIsUnique = true;
        } else {
            username = genUsername.generateUsername("-",6);
        }
    }

    return username;
}