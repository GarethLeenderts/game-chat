const bcrypt = require('bcrypt');

const UserModel = require('../models/User');


exports.registerWithPassword = async (username, email, password) => {
    try {
        saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // const username = generateUniqueUsername();
    
        const user = await User.create({username, email, hashedPassword});
    } catch (error) {
        console.log(error);
    }
};