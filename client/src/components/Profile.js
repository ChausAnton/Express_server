import React, { useContext, useState } from "react";
import { EditProfile } from "./EditProfile";
import { AuthContext } from '../context/AuthContext';

export const Profile = ({user}) => {
    const [editProfile, setEditProfile] = useState(false);
    const {userId} = useContext(AuthContext);

    if(!user) {
        return <p className="center">User not found</p>
    }

    const PrifileImage = "/image/getUserImage/" + userId;


    const setEditProfileOnTrue = () => {
        setEditProfile(true)
    }

    const setEditProfileOnFalse = () => {
        setEditProfile(false)
    }

    return (
    <>
    {   editProfile ? 
        (<div>
            <EditProfile setEditProfileOnFalse={setEditProfileOnFalse}/>
        </div>) 
    
        : (<div className="center ProfileCard">
        <div className="col s4 m4">
                <div className="card">
                    <div className="Profile_backgroud blue darken-2">
                        <span className="ProfileUserName">{user.real_name}</span>
                        <img src={PrifileImage} alt="Avatar" width="200" height="200" className="profileImage"/>
                    </div>
                    <button className="btn-floating btn-large waves-effect waves-light red EditButton" onClick={setEditProfileOnTrue}> 
                            <i className="material-icons" >edit</i>
                    </button>
                    <div className="card-content CardContent blue darken-2">
                        <div className="row">
                            <div className="white-text ProfileLogin">{user.login}</div>
                        </div>
                        
                    </div>
            </div>
        </div>
    </div>)}
    </>
    );
    
}