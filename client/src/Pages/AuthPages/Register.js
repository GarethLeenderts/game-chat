import React from 'react';
import axios from 'axios';

import {getGoogleOAuthURLRegister} from '../../Services/getGoogleOAuthUrl';
import { isEmailValid, isPasswordValid, doPasswordsMatch } from '../../Services/auth';

// const serverLocation = "http://localhost:5000";
const serverEndpoint = process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT;


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
            return console.log(response);
        } catch (error) {
            console.log(error);
        };
    };

    const handleClick = () => {
        const query = getGoogleOAuthURLRegister();
        console.log(query);
    };

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
                    <a href={getGoogleOAuthURLRegister()}>Register with Google</a>
                </div>
                <div>
                    {/* <button href={getGoogleOAuthURLRegister()}>withGoogle</button> */}
                    <button onClick={handleClick}>withGoogle</button>
                </div>
                <div>
                    <h2>{process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}</h2>
                    <h2>{process.env.REACT_APP_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}</h2>
                    <h2>{process.env.REACT_APP_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL_register}</h2>
                    <h2>{process.env.REACT_APP_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL_login}</h2>
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