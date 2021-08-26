import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const Navbar = () => {
    const [user, setUser] = useState();
    const {loading, request} = useHttp();
    const {userId} = useContext(AuthContext);


    const fetcehCategories = useCallback(async() => {
        try {
            const fetched = await request('/category/getCategories', 'GET', null)
            sessionStorage.setItem('categories', JSON.stringify(fetched))
        }
        catch (e) {}
    }, [request]);


    const fetcehUser = useCallback(async() => {
        const fetched = await request('/user/getUser/' + userId, 'GET', null)
        setUser(fetched)
    }, [userId, request]);

    useEffect( () => {
        if(!sessionStorage.getItem('categories'))
            fetcehCategories();
        fetcehUser()
    }, [fetcehCategories, fetcehUser]);

    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/')
    };

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        window.M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
    })

    if(loading || !JSON.parse(sessionStorage.getItem('categories')) || !user) {
        return <></>
    }
    const userAvater = "/image/getUserImage/" + userId;

    return (
        <div>
            <ul id="dropdown1" className="dropdown-content">
                    {JSON.parse(sessionStorage.getItem('categories')).map((category) => {
                        const link = "/home/1/" + category.category_title
                        return (
                            <li key={category.id}><NavLink to={link}>{category.category_title}</NavLink></li>
                        );
                    })}
            </ul>
            <nav>
                <div className="nav-wrapper blue darken-1 padingInNavbar">
                <NavLink to="/" className="Logo">NiHelper</NavLink>
                <NavLink to="/profile" className="chip ChipCustom">
                    <img src={userAvater} alt="avatar" width="50" height="50"/>
                    <div className="UserInfoNavbar">{user.login}</div>
                    <i className="material-icons UserInfoNavbarIcon">star</i>
                </NavLink>
                <ul id="nav-mobile" className="right">
                    <li><a className="dropdown-trigger" data-target="dropdown1">Categories<i className="material-icons right">arrow_drop_down</i></a></li>
                    <li><NavLink to="/create">Create Post</NavLink></li>
                    <li><a className="blue darken-3" href="/home" onClick={logoutHandler}>Logout</a></li>
                </ul>
                </div>
            </nav>
        </div>
    );
}
