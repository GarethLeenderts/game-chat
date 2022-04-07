const mongoose = require('mongoose');

// exports.checkIfUserExists = async (req, res, next) => {
//     // check database to check of email or username already exist
//     const { registrationStrategy } = req.params;

//     if (registrationStrategy === 'password') {
//         const { username, email, password } = req.body;

//         if (username === "") {
//             // const username = generateUniqueUsername();
//             res.json({message: `Please add a username`});
//         } else {

//             const users = await mongoose.findby(username);
//             if (users.length !== 0) {
//                 res.json({message: `Username ${username} already exists`});
//             }
//         }

//     } 
// };