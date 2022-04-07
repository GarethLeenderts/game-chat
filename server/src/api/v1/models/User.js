const mongoose = require('mongoose');

// const uuid = require('uuid');
// const generateUUID = () => {
//     return uuid.v4;
// };

const isEmailValid = (email) => {
    // return true or false
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = EMAIL_REGEX.test(email); // returns true or false
    // OR 
    // const isValid = email.match(EMAIL_REGEX); // returns null if no match, returns matches if they exist

    return isValid;
};

const RFC5322_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// `
// ^(?:[a-zA-Z0-9])([-_0-9a-zA-Z]+(\.[-_0-9a-zA-Z]+)*|^\"([\001-\010\013\014\016-\037!#-\[\]-\177]
//     |\\[\001-011\013\014\016-\177])*\")@
//     (?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}\.?$
// `/


const userSchema = new mongoose.Schema(
    {
        // _id: {type: String, default: generateUUID()}, 2
        _id: mongoose.ObjectId, //Number, //String, //new mongoose.Types.ObjectId(),
        email: {
            type: String, 
            required: true, 
            lowercase: true,
            match: [RFC5322_EMAIL_REGEX, 'Please enter valid email.'],
            // validate: [isEmailValid, 'Please enter valid email.'],
            // validate: {
            //     validator: isEmailValid(v),
            //     message: props => `${props.value} is not a valid email address.`,
            // }
        },
        username: {
            type: String, 
            required: true
        },
        picture:{
            data: Buffer, 
            contentType: String
        },
        role: {
            type: String, 
            default: "user", 
            enum: ["user", "admin", "superuser", "level29Paladin", "guest"]
        },
        createdAt: {
            type: Date, 
            immutable: true, 
            default: () => Date.now()
        },
        updatedAt: {
            type: Date, 
            default: () => Date.now()
        },
        google_id: String,
        google_email: {
            type: String, 
            required: false, 
            lowercase: true,
            match: [RFC5322_EMAIL_REGEX, 'Please enter valid email.'],
        },
        linkedin_id: String,
        linkedin_email: {
            type: String, 
            required: false, 
            lowercase: true,
            match: RFC5322_EMAIL_REGEX,
        },
        github_id: String,
        github_email: {
            type: String, 
            required: false, 
            lowercase: true,
            match: RFC5322_EMAIL_REGEX,
        },
        facebook_id: String,
        facebook_email: {
            type: String, 
            required: false, 
            lowercase: true,
            match: RFC5322_EMAIL_REGEX,
        },
    },
    {
        collection: 'Users',
    }
);

const UserModel = mongoose.model("User", userSchema);

// export default UserModel;
// exports.default = UserModel;
module.exports = UserModel;