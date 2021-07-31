import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const CreatePage = () => {
    const history = useHistory();
    const message = useMessage();

    const {token} = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState ( {
        email: '', login: '', real_name: '', password: '', passwordConfirmation: ''
    });

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect( () => {
        window.M.updateTextFields()
    }, []);

    const chengeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const PostHandler = async(event) => {
        try {
            event.preventDefault();
            form.category_id = JSON.parse(form.category_id)
            const data = await request('/post/createPost', 'POST', {...form}, {'x-access-token': token})
            console.log(data)
            history.push('/')
        }
        catch (e) {}
    };

    return (
        <div>
            <div className="card blue darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Create Post</span>
                        <div>
                        <div className="input-field">
                                <input placeholder="input title" 
                                    id="title" 
                                    type="text" 
                                    name="title" 
                                    className="yellow-input" 
                                    onChange={chengeHandler} 
                                    />

                                <label htmlFor="title">title</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="input content" 
                                    id="content" 
                                    type="text" 
                                    name="content" 
                                    className="yellow-input" 
                                    onChange={chengeHandler} 
                                    />

                                <label htmlFor="content">content</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="input category_id" 
                                    id="category_id" 
                                    type="text" 
                                    name="category_id" 
                                    className="yellow-input" 
                                    onChange={chengeHandler} 
                                    />

                                <label htmlFor="category_id">category_id</label>
                            </div>
                        </div>
                </div>
                <div className="card-action">
                    <button className="btn yellow darken-4" onClick={PostHandler} disabled={loading}>Submit</button>
                </div>
            </div>
        </div>
    );
}