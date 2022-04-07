import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const serverLocation = process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT;

const UserDashboard = () => {
    
    const { username } = useParams();
    // const userData = await axios.get(`${serverLocation}/${username}`);

    // const [userName, setUserName] = useState(username);
    const [userData, setUserData] = useState({});

    const getUserData = async (username) => {
        const { user } = await axios.get(`${serverLocation}/${username}`);
        return user;
    };

    const usernameMemo = useMemo(() => {return username;}, [username]); // Memoization(caching) of username

    useEffect(() => {
        const user = getUserData(usernameMemo);
        setUserData(user);
    }, [usernameMemo]);
    // useEffect(() => {
    //     const user = getUserData(username);
    //     setUserData(user);
    // }, [username]);

    return (
        <div>
            {Object.keys(userData).map((key) => {return <p>{key}: {userData[key]} </p>})}
        </div>
    );

};

export default UserDashboard;