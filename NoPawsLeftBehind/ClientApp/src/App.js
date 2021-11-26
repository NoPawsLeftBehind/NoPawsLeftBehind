import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { About } from './components/About';
import Dashboard from './components/Dashboard';
import AddPet from './components/AddPet';
import FilterPets from './components/FilterPets';
import { VerifyEmail } from './components/VerifyEmail';
import PetProfile from './components/pet_profile/PetProfile';
import { Contact } from './components/Contact';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
                <Route path='/search' component={FilterPets} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/add-pet' component={AddPet} />
                <Route path='/verify-email' component={VerifyEmail} />
                <Route path='/pet-profile/:id' component={PetProfile} />
                <Route path='/contact' component={Contact} />
            </Layout>
        );
    }
}
