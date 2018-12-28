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
                    <Redirect exact from='/' to='/Home' />
                    <Route path='/Home' component={Home} />
                    <Route path='/Login' component={Login} />
                    <Route path='/Nomination' component={Nomination} />
                    <Route path='/Objection' component={Objection} />
                    <Route path='/Profile' component={Profile} />
                </Switch>
            </div>
        );

    }
}