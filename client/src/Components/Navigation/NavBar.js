import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';


const serverLocation = process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT;
const rootUrl = process.env.ROOT_URL;

const NavBar = ({ username = 'Guest' }) => {
    
    return (
        <div>
            <nav>
                <div>
                    <h6><a href={`${rootUrl}/home`}>Home</a></h6>
                </div>
                <div>
                    <h6><a href={`${rootUrl}/register`}>Register</a></h6>
                </div>
                <div>
                    <h6><a href={`${rootUrl}/login`}>Login</a></h6>
                </div>
                <div>
                    <h5><a href={`${rootUrl}/${username}`}>{username}</a></h5>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;