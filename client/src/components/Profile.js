import React, { useContext, useState } from "react";
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export const Profile = ({user}) => {
    const {userId, token} = useContext(AuthContext);
    const [file, setFile] = useState();


    if(!user) {
        return <p className="center">User not found</p>
    }


    const PrifileImage = "/image/getUserImage/" + userId;

    const fileSelectedHandler = event => {
        setFile(event.target.files[0])
    }

    const fileUploadHandler = async(event) => {
        try {
            event.preventDefault();

            const data = new FormData();
            data.append("file", file)
            
            await axios.post('/image/uploadUserImage/' + userId, data, {headers: {'x-access-token': token,
                                                                                    'Content-Type': 'application/json',
                                                                                    'Acceptccept': 'application/json'
                                                                                    }})
        }
        catch (e) {}
    }

    return (
    <div className="center">
        <div className="col s4 m4">
                <div className="card">
                    <div className="blue darken-3">
                        <div className="Profile_backgroutd">
                            <img src={PrifileImage} alt="Avatar" width="200" height="200" className="profileImage"/>
                        </div>
                    </div>
                    <div className="card-content blue darken-2">
                        <span className="card-title white-text">{user.login}</span>
                        <div className="row">
                            <div className="col s12 white-text">{user.real_name}</div>
                            <div className="col s12 white-text">{user.email}</div>
                            <div className="col s12 white-text">{user.role}</div>
                            <div className="col s12 white-text">{user.rating}</div>
                        </div>
                    </div>
                    <div className="card-action">
                        <input type="file" onChange={fileSelectedHandler} name="Avatar"/>
                        <button onClick={fileUploadHandler}>Upload iamge</button>
                        <button >This is a link</button>
                    </div>
            </div>
        </div>
    </div>
    );
}