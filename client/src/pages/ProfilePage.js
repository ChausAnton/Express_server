import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { Profile } from '../components/Profile';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useParams } from "react-router-dom";

export const ProfilePage = () => {
    const [user, setUser] = useState();
    const {loading, request} = useHttp();
    const {userId} = useContext(AuthContext);
    const {id} = useParams();

    const fetchUser = useCallback(async() => {
        try {
            let fetched;
            if(id)
                fetched = await request('/user/getUser/' + id, 'GET', null)
            else 
                fetched = await request('/user/getUser/' + userId, 'GET', null)
            setUser(fetched)
        }
        catch (e) {}
    }, [userId, request]);

    useEffect( () => {
        fetchUser();
    }, [fetchUser]);

    if(loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <Profile user={user}/>}
        </>
    );

}