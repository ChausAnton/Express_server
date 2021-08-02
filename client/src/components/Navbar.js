import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "./Loader";

export const Navbar = () => {

    const [categories, setCategories] = useState([]);
    const {loading, request} = useHttp();

    const fetceCategories = useCallback(async() => {
        try {
            const fetched = await request('/category/getCategories', 'GET', null)
            setCategories(fetched)
        }
        catch (e) {}
    }, [request]);

    useEffect( () => {
        fetceCategories();
    }, [fetceCategories]);

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

    if(loading || !categories.length) {
        return <Loader />
    }
    
    return (
        <div>
            <ul id="dropdown1" className="dropdown-content">
                    {categories.map((category) => {
                        const link = "/home/" + category.title
                        return (
                            <li key={category.id}><NavLink to={link}>{category.title}</NavLink></li>
                        );
                    })}
            </ul>
            <nav>
                <div className="nav-wrapper blue darken-1 padingInNavbar">
                <NavLink to="/">Logo</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a className="dropdown-trigger" data-target="dropdown1">Categories<i className="material-icons right">arrow_drop_down</i></a></li>
                    <li><NavLink to="/create">Create Post</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><a className="blue darken-3" href="/home" onClick={logoutHandler}>Logout</a></li>
                </ul>
                </div>
            </nav>
        </div>
    );
}
