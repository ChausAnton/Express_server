import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    console.log(auth)

    const message = useMessage();

    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState ( {
        login: '', password: ''
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

    const loginHandler = async() => {
        try {
            const data = await request('/auth/signIn', 'POST', {...form})
            auth.login(data.accessToken, data.id);
        }
        catch (e) {}
    };


    return (
        <div>
            <div className="card blue darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="input login" 
                                    id="login" 
                                    type="text" 
                                    name="login" 
                                    className="yellow-input" 
                                    onChange={chengeHandler} />

                                <label htmlFor="login">login</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="input password" 
                                    id="password" 
                                    type="password" 
                                    name="password" 
                                    className="yellow-input" 
                                    onChange={chengeHandler} />

                                <label htmlFor="password">password</label>
                            </div>

                        </div>
                </div>
                <div className="card-action">
                    <button 
                        className="btn yellow darken-4 regButtonMargin"
                        onClick={loginHandler}
                        disabled={loading}>
                        sign in
                    </button>

                    <a className="btn grey lighten-1" href="/register" disabled={loading}>sign up</a>
                </div>
            </div>
        </div>
    );
}