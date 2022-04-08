import React from 'react';
import axios from 'axios';

const serverLocation = process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT;

const Logout = () => {

    const handleLogout = async () => {
        const response = await axios.get(`${serverLocation}/auth/logout`);
    };

    return (
        <div>
            <div>
                <h1>Logout Page</h1>
            </div>
            <div>
                <a href={`${serverLocation}/auth/logout`}>Logout</a>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Logout;