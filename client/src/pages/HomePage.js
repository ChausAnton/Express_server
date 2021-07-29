import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext'
import { Loader } from '../components/Loader';
import { PostsList } from '../components/PostsList';

export const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchPosts = useCallback(async() => {
        try {
            const fetched = await request('/post/getPosts', 'GET', null, {
                'x-access-token': token
            })
            setPosts(fetched)
        }
        catch (e) {}
    }, [token, request]);

    useEffect( () => {
        fetchPosts();
    }, [fetchPosts]);

    if(loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <PostsList posts={posts}/>}
        </>
    );
}