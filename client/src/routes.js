import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {RegisterPage} from './pages/RegisterPage'
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

export const useRoutes = isAuth => {
    if(isAuth) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        );
    }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>
            <Route path="/forgotPassword" exact>
                <ForgotPassword />
            </Route>
            <Route path="/resetPassword/:token/:id" exact>
                <ResetPassword />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};