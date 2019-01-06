import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Nomination from 'pages/Nomination/Nomination'
import Objection from 'pages/Objection/Objection'
import Profile from 'pages/Profile/Profile'

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
                    <Route path='/nomination' component={(this.state.isLoggedIn) ? Nomination : Login}/>
                    <Route path='/objection' component={(this.state.isLoggedIn) ? Objection : Login} />
                    <Route path='/profile' component={(this.state.isLoggedIn) ? Profile : Login} />
                </Switch>
            </div>
        );

    }
}
