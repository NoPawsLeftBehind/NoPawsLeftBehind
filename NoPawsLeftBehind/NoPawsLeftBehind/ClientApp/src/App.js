import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import FilterPets from './components/FilterPets';
import './custom.css'
import SignIn from './components/sign-in/SignIn';
import Register from './components/register/Register';
import CardList from './components/CardList';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FilterPets} />
            <Route path='/sign-in' component={SignIn} />
            <Route path='/register' component={Register} />
      </Layout>
    );
  }
}
