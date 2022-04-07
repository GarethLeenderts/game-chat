const User = require('../models/User');

exports.getUserData = async (req, res, next) => {
    const { username } = req.params;
    // console.log(req.params);

    try {
        const user = await User.findOne({username: username});

        res.json(JSON.stringify(user));
        // console.log(JSON.stringify(user));
    } catch (error) {
        console.log(error);
    };
};