import React, { useCallback, useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const Navbar = () => {

    const {loading, request} = useHttp();

    const fetceCategories = useCallback(async() => {
        try {
            const fetched = await request('/category/getCategories', 'GET', null)
            console.log(1)
            sessionStorage.setItem('categories', JSON.stringify(fetched))
        }
        catch (e) {}
    }, [request]);


    useEffect( () => {
        if(!sessionStorage.getItem('categories'))
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

    if(loading || !JSON.parse(sessionStorage.getItem('categories'))) {
        return <></>
    }


    return (
        <div>
            <ul id="dropdown1" className="dropdown-content">
                    {JSON.parse(sessionStorage.getItem('categories')).map((category) => {
                        const link = "/home/" + category.category_title
                        return (
                            <li key={category.id}><NavLink to={link}>{category.category_title}</NavLink></li>
                        );
                    })}
            </ul>
            <nav>
                <div className="nav-wrapper blue darken-1 padingInNavbar">
                <NavLink to="/">Logo</NavLink>
                <ul id="nav-mobile" className="right">
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
