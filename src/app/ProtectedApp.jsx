import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from 'pages/Dashboard/Dashboard';
import Login from 'pages/Login/Login';
import test from 'pages/test/test';
import NominationForm from 'pages/NominationForm/NominationForm';


export default class Protected extends Component {
    render() {
        return (
            /* app level routers needs to handle here*/
            <div>
                <Switch>
                    <Redirect exact from='/' to='/dashboard' />
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/login' component={Login} />
                    <Route path='/test' component={test} />
                    <Route path='/candidate' component={NominationForm} />
                </Switch>
            </div>
        );

    }
}