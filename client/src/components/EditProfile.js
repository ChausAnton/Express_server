import React, { useContext, useState, useEffect } from "react";
import { useMessage } from '../hooks/message.hook';
import axios from 'axios';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';


export const EditProfile = ({setEditProfileOnFalse}) => {
    const {userId, token} = useContext(AuthContext);
    const [file, setFile] = useState();
    const {error, request, clearError} = useHttp()
    const message = useMessage();

    const [form, setForm] = useState({
        real_name: ''
    });

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect( () => {
        window.M.updateTextFields()
    }, []);

    const fileSelectedHandler = event => {
        if(event.target.files[0]) {
            console.log(event.target.files[0])
            const image = document.getElementById('ProfileImage');
            image.src = window.URL.createObjectURL(event.target.files[0]);
        }
        setFile(event.target.files[0])
    }

    const chengeHandler = event => {
        event.preventDefault();
        setForm({...form, [event.target.name]: event.target.value})
    };
    
    const profileUpdateHandler = async(event) => {
        try {
            if(file) {
                event.preventDefault();
                const data = new FormData();
                data.append("file", file)
                
                axios.post('/image/uploadUserImage/' + userId, data, {headers: {'x-access-token': token,
                                                                                        'Content-Type': 'application/json',
                                                                                        'Acceptccept': 'application/json'
                                                                                        }})
            }
            await request('/user/updateUser/' + userId, 'PUT', {...form}, {'x-access-token': token});
            window.location.reload();
            setEditProfileOnFalse();
        }
        catch (e) {}
    }

    const openSelectImage = () => {
        document.getElementById('selectFileInput').click();
    }

    const PrifileImage = "/image/getUserImage/" + userId;
    return (
        <div className="center ProfileCard">
        <div className="col s4 m4">
                <div className="card">
                    <div className="CardTopBackgroud blue darken-2">
                        <button className="btn-floating btn-large waves-effect waves-light grey lighten-1 ButtonBack" onClick={setEditProfileOnFalse}> 
                                <i className="material-icons">arrow_back</i>
                        </button>
                        <img src={PrifileImage} alt="Avatar" width="200" height="200" className="EditProfileImage" id="ProfileImage"/>
                        <div className="boxForLoadNewImageButton">
                            <button className="btn-floating btn-large waves-effect waves-light grey lighten-1 LoadNewImage" id="LoadNewImageButton" onClick={openSelectImage}><i className="material-icons">add</i></button>
                        </div>
                    </div>
                    
                    <div className="card-content CardContent blue darken-2">
                        <div className="input-field">
                            <input placeholder="input real name" 
                                id="real_name" 
                                type="text" 
                                name="real_name" 
                                className="yellow-input white-text" 
                                onChange={chengeHandler} 
                                />
                            <label htmlFor="real_name">real name</label>
                        </div>
                        <input type="file" onChange={fileSelectedHandler} name="Avatar" hidden id="selectFileInput"/>
                        <button className="btn waves-effect waves-light red" onClick={profileUpdateHandler}>Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
            </div>
        </div>
    </div>
    );
}