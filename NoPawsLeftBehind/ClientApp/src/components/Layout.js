import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Header } from './Header';
import { Footer } from './Footer.js';
import SignUp from './SignUp';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
            <Header />
            <div>
                <SignUp />
                </div>
            <Footer />
      </div>
    );
  }
}
