import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

export default class Protected extends Component {
    render() {
        return (
            /* app level routers needs to handle here*/
            <div>
                <Switch>
                    <Redirect exact from='/' to='/dashboard' />
                    <Route path='/dashboard' component={Dashboard} />
                </Switch>
            </div>
        );

    }
}