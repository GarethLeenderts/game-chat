const User = require('../models/User');

exports.getUserData = async (req, res, next) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({username: username});

        res.json(user);
    } catch (error) {
        console.log(error);
    };
};