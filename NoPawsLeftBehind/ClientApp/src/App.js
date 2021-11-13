import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Dashboard from './components/Dashboard';
import AddPet from './components/AddPet';
import { VerifyEmail } from './components/VerifyEmail';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/add-pet' component={AddPet} />
                <Route path='/verify-email' component={VerifyEmail} />
            </Layout>
        );
    }
}
