import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'pages/Login/Login';

import NominationForm from 'pages/USER/NominationForm/NominationForm';
import Home from 'pages/USER/Home/Home';
import Objection from 'pages/USER/Objection/Objection'
import Profile from 'pages/USER/Profile/Profile'

import Admin_home from 'pages/ADMIN/Home/Home'
import Admin_CallElection from 'pages/ADMIN/Call-election/Call-election'
import Admin_CandidateConfig from 'pages/ADMIN/Candidate-config/Candidate-config'
import Admin_ElectionConfig from 'pages/ADMIN/Election-config/Election-config'
import Admin_NominationProcessConfig from 'pages/ADMIN/NominationProcess-config/NominationProcess-config'
import ActiveElectionForm from 'pages/ADMIN/ActiveElectionForm/ActiveElectionForm';

import NominationReview from 'pages/ADMIN/Nomination_review/Nomination_review';
import PaymentReview from 'pages/ADMIN/Payment_review/Payment_review';
import ObjectionReview from 'pages/ADMIN/Objection_review/Objection_review';
import ElectionReview from 'pages/ADMIN/Election_review/Election_review';



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
                    {/* <Route path='/nomination' component={Nomination} /> */}
                    <Route path='/objection' component={Objection} />
                    <Route path='/profile' component={Profile} />

                    <Route path='/nomination' component={NominationForm} />
                    
                    <Redirect exact from='/admin' to='/admin/home' />
                    <Route path='/admin/home' component={Admin_home} />
                    <Route path='/admin/call-election' component={Admin_CallElection} />
                    <Route path='/admin/candidate-config' component={Admin_CandidateConfig} />
                    <Route path='/admin/election-config' component={Admin_ElectionConfig} />
                    <Route path='/admin/nominationProcess-config' component={Admin_NominationProcessConfig} />
                    <Route path='/admin/active-election' component={ActiveElectionForm} />

                    <Route path='/admin/nomination-review' component={NominationReview} />
                    <Route path='/admin/payment-review' component={PaymentReview} />
                    <Route path='/admin/objection-review' component={ObjectionReview} />
                    <Route path='/admin/election-review' component={ElectionReview} />



                    {/* <Route path='/nomination' component={(this.state.isLoggedIn) ? NominationForm : Login}/>
                    <Route path='/objection' component={(this.state.isLoggedIn) ? Objection : Login} />
                    <Route path='/profile' component={(this.state.isLoggedIn) ? Profile : Login} />
                    <Route path='/election' component={(this.state.isLoggedIn) ? ElectionHome : Login}} /> */}

                </Switch>
            </div>
        );

    }
}
