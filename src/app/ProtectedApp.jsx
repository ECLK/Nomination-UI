import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'pages/Login/Login';
import NominationForm from 'pages/NominationForm/NominationForm';
import Home from 'pages/Home/Home';
import Objection from 'pages/Objection/Objection'
import Profile from 'pages/Profile/Profile'
import AllowNomination from 'pages/ADMIN/Nomination/AllowNomination';

export default class Protected extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoggedIn: false,
        }
        
        // dummy login process just to determine the logged in user role as 'user' or 'admin'
        if (sessionStorage.getItem('role') !== null){
            if (sessionStorage.getItem('role').includes('user')){
                this.state.isLoggedIn = true;
            } else if (sessionStorage.getItem('role').includes('admin')){
                this.state.isLoggedIn = true;
            }
        }
    }

    render() {
        return (
            /* app level routers needs to handle here*/
            <div>
                <Switch>
                    <Redirect exact from='/' to='/home' />
                    <Route path='/home' component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/nomination' component={(this.state.isLoggedIn) ? NominationForm : Login}/>
                    <Route path='/objection' component={(this.state.isLoggedIn) ? Objection : Login} />
                    <Route path='/profile' component={(this.state.isLoggedIn) ? Profile : Login} />
                    <Route path='/allow-nomination' component={(this.state.isLoggedIn) ? AllowNomination : Login} />
                </Switch>
            </div>
        );

    }
}
