import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const serverLocation = process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT;

const UserDashboard = () => {
    
    const { username } = useParams();

    const [userData, setUserData] = useState({});
    const [isLoading, setLoading] = useState(true);

    const getUserData = async (username) => {
        try {
            const response = await axios.get(`${serverLocation}/users/${username}`);
            setUserData(JSON.parse(response.data));
        } catch (error) {
            console.log(error);
        }
    };
    // const getUserData = async () => {
    //     // console.log(username);
    //     // const { username } = useParams();
    //     try {
    //         const response = await axios.get(`${serverLocation}/users/${username}`);
    //         setUserData(JSON.parse(response.data));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const usernameMemo = useMemo(() => {return username;}, [username]); // Memoization(caching) of username

    useEffect(() => {
        getUserData(usernameMemo);
        setLoading(false);
    }, [usernameMemo]);
    // useEffect(() => {
    //     getUserData();
    //     setLoading(false);
    // }, []);

    if (isLoading === true) {
        return (
            <div>
                <h1>Still loading...</h1>
            </div>
        )
    }

    return (
        <>
        <div>
            <div>
                <h5>{username}</h5>
            </div>
            <div>
                <h6>{userData.email}</h6>
            </div>
            <div>
                {Object.keys(userData).toString()}
            </div>
            <div>
                {Object.keys(userData).map((key) => {
                    return (
                        <div key={key}>
                        <p><b>{key}:</b> {userData[key]} </p>
                        </div>
                        );
                    }
                )}
            </div>
            {/* <div>
                {Object.entries(userData)}
            </div> */}
        </div>
        </>
    );

};

export default UserDashboard;