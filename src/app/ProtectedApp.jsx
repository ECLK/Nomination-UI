import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'pages/Login/Login';
import NominationForm from 'pages/USER/NominationForm/NominationForm';
import Home from 'pages/USER/Home/Home';
import Nomination from 'pages/USER/Nomination/Nomination'
import Objection from 'pages/USER/Objection/Objection'
import Profile from 'pages/USER/Profile/Profile'

import Admin_home from 'pages/ADMIN/Home/Home'

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
                    <Route path='/nomination' component={Nomination} />
                    <Route path='/objection' component={Objection} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/candidate' component={NominationForm} />
                    
                    <Redirect exact from='/admin' to='/admin/home' />
                    <Route path='/admin/home' component={Admin_home} />

                </Switch>
            </div>
        );

    }
}
