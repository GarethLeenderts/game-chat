import React from 'react';

import {getGoogleOAuthURLLogin} from '../../Services/getGoogleOAuthUrl';

// const serverLocation = "http://localhost:5000";
const serverLocation = process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT;

const LoginForm = () => {
    // const renderErrorMessage = () => { 
    //     if (messages.error) { 
    //     return <div><h5>{messages.error}</h5></div>;
    //     }
    // }

    return (
        <div>
            <div><h3>loginForm</h3></div>
            {/* { messages.error && <div><h5>{messages.error}</h5></div> } */}
            {/* <renderErrorMessage /> */}
            <div>
                <form action={`${serverLocation}/login`} method="POST">
                    <div>
                        <input type='email' placeholder='email' required/>
                    </div>
                    <div>
                        <input type='password' placeholder='password' required/>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
            <div>
                <a href='/register'>Register</a>
            </div>
            <div>
                <div>
                    <a href={getGoogleOAuthURLLogin()}>Login with Google</a>
                </div>
                <div>
                    <button href={getGoogleOAuthURLLogin()}>withGoogle</button>
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

export default LoginForm;