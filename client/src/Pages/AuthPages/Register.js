import React from 'react';
import axios from 'axios';

import getGoogleOAuthURL from '../../Services/getGoogleOAuthUrl';
import { isEmailValid, isPasswordValid, doPasswordsMatch } from '../../Services/auth';

// const serverLocation = "http://localhost:5000";
const serverEndpoint = process.env.PUBLIC_SERVER_ENDPOINT;


const RegistrationForm = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let formData = {
            username: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value,
            confirm_password: event.target[3].value,
        };

        console.log(event.target);
        console.log(formData);

        if (isEmailValid(formData.email) === false) {
            return console.log("Email invalid!");
        };

        const passwordValidCheck = isPasswordValid(formData.password);
        if (passwordValidCheck.passwordValid === false) {
            return console.log(`Password invalid. Please include at least 8 characters, 
                                1 number, & 1 special character(!@?#$^()[]*)`, 
                                passwordValidCheck);
        };

        if (doPasswordsMatch(formData.password, formData.confirm_password) === false) {
            return console.log("Passwords do not match.")
        };

        try {
            const response = await axios.post(`${serverEndpoint}/auth/register`, formData);
        } catch (error) {
            console.log(error);
        };
    }
    return (
        <div>
            <div><h3>registrationForm</h3></div>
            <div>
                {/* <form action={`${serverLocation}/register`} method="POST"> */}
                <form onSubmit={handleSubmit} method="POST">
                    <div>
                        <input type='text' placeholder='username' required/> 
                    </div>
                    <div>
                        <input type='email' placeholder='email' required/>
                    </div>
                    <div>
                        <input type='password' placeholder='password' required/>
                    </div>
                    <div>
                        <input type='password' placeholder='confirm password' required/>
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                    <div>
                        <button>Clear</button>
                    </div>
                </form>
            </div>
            <div>
                <div>
                    <a href={getGoogleOAuthURL()}>Register with Google</a>
                </div>
                <div>
                    <button href={getGoogleOAuthURL()}>withGoogle</button>
                </div>
                {/* <div>
                    <button>withLinkedIn</button>
                </div>
                <div>
                    <button>withFacebook</button>
                </div>
                <div>
                    <button>withTwitter</button>
                </div> */}
            </div>
        </div>
    );
};

export default RegistrationForm;