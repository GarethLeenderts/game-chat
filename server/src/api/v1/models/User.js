// {
//     user_id: String,
//     email: Email,
//     username: String,
//     user_slug: url_slug, // how username appears in url_route
//     other_emails: [list], ???redundant
//     role: [admin, user, superhero], //extra access control
//     googleCredentials: {google_id: String, // hashed?
//                         googleEmail: Email},
//     facebookCredentials: {facebook_id: String, // hashed?
//                           facebookEmail: Email},
//     linkedinCredentials: {linkedin_id: String, // hashed?
//                           linkedinEmail: Email},
//     githubCredentials: {github_id: String, // hashed?
//                          githubEmail: Email},
//     twitterCredentials: {twitter_id: String, // hashed?
//                          twitterEmail: Email},
// }

// _id:
// email:
// username:
// picture:
// role: [admin, user, superuser, guest]
// google_id:
// google_email:
// linkedin_id:
// linkedin_email:

// const uuid = require('uuid');
// const generateUUID = () => {
//     return uuid.v4;
// };

// const isEmailValid = (email) = {
//     // return true or false
// };

const RFC5322_EMAIL_REGEX = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|
                            (".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|
                            (([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        // _id: {type: String, default: generateUUID()},
        _id: new mongoose.Types.ObjectId(),
        email: {
            type: String, 
            required: true, 
            lowercase: true,
            match: RFC5322_EMAIL_REGEX,
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
            enum: ["user", "admin", "superuser", "level29Paladin"]
        },
        createdAt: {
            type: Date, 
            mmutable: true, 
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
            match: RFC5322_EMAIL_REGEX,
            // validate: {
            //     validator: isEmailValid(v),
            //     message: props => `${props.value} is not a valid email address`,
            // }
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
    }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;