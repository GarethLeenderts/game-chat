const mongoose = require('mongoose');

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
            enum: ["user", "admin", "superuser", "level29Paladin", "guest"]
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