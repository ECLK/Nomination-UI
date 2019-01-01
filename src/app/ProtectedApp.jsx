import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Nomination from 'pages/Nomination/Nomination'
import Objection from 'pages/Objection/Objection'
import Profile from 'pages/Profile/Profile'

export default class Protected extends Component {
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
                </Switch>
            </div>
        );

    }
}