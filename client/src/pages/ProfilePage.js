import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { Profile } from '../components/Profile';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const ProfilePage = () => {
    const [user, setUser] = useState();
    const {loading, request} = useHttp();
    const {userId} = useContext(AuthContext);

    const fetchUser = useCallback(async() => {
        try {
            const fetched = await request('/user/getUser/' + userId, 'GET', null)
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