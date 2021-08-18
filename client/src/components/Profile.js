import React, { useContext, useState } from "react";
import { EditProfile } from "./EditProfile";
import { AuthContext } from '../context/AuthContext';
import { useParams } from "react-router-dom";

export const Profile = ({user}) => {
    const [editProfile, setEditProfile] = useState(false);
    const {userId} = useContext(AuthContext);
    const {id} = useParams();

    if(!user) {
        return <p className="center">User not found</p>
    }

    let PrifileImage = "/image/getUserImage/" + userId;
    if(id)
        PrifileImage = "/image/getUserImage/" + id;



    const setEditProfileOnTrue = () => {
        setEditProfile(true)
    }

    const setEditProfileOnFalse = () => {
        setEditProfile(false)
    }

    return (
    <>
    {   (editProfile && (!id || (userId === id))) ? 
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
                    {(!id || (userId === parseInt(id))) ?
                        <button className="btn-floating btn-large waves-effect waves-light red EditButton" onClick={setEditProfileOnTrue}> 
                                <i className="material-icons" >edit</i>
                        </button> : <></>
                    }
                    
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