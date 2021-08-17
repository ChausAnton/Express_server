import React, { useContext, useState } from "react";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export const EditProfile = ({setEditProfileOnFalse}) => {
    const {userId, token} = useContext(AuthContext);
    const [file, setFile] = useState();
    
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
        <div>
            <div onClick={() => setEditProfileOnFalse()}> go back</div>
            <p>some shit</p>
            <input type="file" onChange={fileSelectedHandler} name="Avatar"/>
            <button onClick={fileUploadHandler}>Upload iamge</button>
        </div>
    );
}