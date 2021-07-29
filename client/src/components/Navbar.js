import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
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
    
    return (
        <div>
            <ul id="dropdown1" className="dropdown-content">
                    <li><a href="#!">one</a></li>
                    <li><a href="#!">two</a></li>
                    <li className="divider"></li>
                    <li><a href="#!">three</a></li>
            </ul>
            <nav>
                <div className="nav-wrapper blue darken-1 padingInNavbar">
                <NavLink to="/">Logo</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a className="dropdown-trigger" href="#" data-target="dropdown1">Categories<i className="material-icons right">arrow_drop_down</i></a></li>
                    <li><NavLink to="/create">Create Post</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><a className="blue darken-3" href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
                </div>
            </nav>
        </div>
    );
}
