import React, { useContext } from "react";
import { AuthContext } from '../context/AuthContext';

export const Profile = ({user}) => {
    const {userId} = useContext(AuthContext);

    if(!user) {
        return <p className="center">User not found</p>
    }
    const PrifileImage = "/image/getUserImage/" + userId;

    return (
    <div className="center">
        <div className="col s4 m4">
                <div className="card">
                    <div className="card-image">
                    <img src={PrifileImage} alt="problem"/>
                </div>
                <div className="card-content blue darken-2">
                    <span className="card-title">{user.login}</span>
                    <div className="row">
                        <div className="col s12">{user.real_name}</div>
                        <div className="col s12">{user.email}</div>
                        <div className="col s12">{user.role}</div>
                        <div className="col s12">{user.rating}</div>
                    </div>
                </div>
                <div className="card-action">
                    <a href="/">This is a link</a>
                </div>
            </div>
        </div>
    </div>
    );
}