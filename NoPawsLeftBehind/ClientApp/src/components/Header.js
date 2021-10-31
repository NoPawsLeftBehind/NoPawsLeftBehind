﻿import React, { Component } from 'react';
import { Nav, Navbar, Container} from 'react-bootstrap';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import '../style/Header.css';
import { appTheme } from './Theme.js'
import PetsIcon from '@mui/icons-material/Pets';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './SignupButton';

export class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <ThemeProvider theme={appTheme}>
                    <Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark">
                        <Container >
                            <PetsIcon sx={{ color: 'white', mr: 1, mb: 1}} />
                            <Navbar.Brand href="#home">No Paws Left Behind</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link className="mx-4" href="/">Home</Nav.Link>
                                    <Nav.Link className="mx-4" href="/counter">About</Nav.Link>
                                    <Nav.Link className="mx-4" href="/fetch-data">Pet Search</Nav.Link>
                                    <Nav.Link className="mx-4" href="/counter">Contact</Nav.Link>
                                    <Nav.Link className="mx-4" href="/fetch-data">FAQ</Nav.Link>
                                </Nav>
                                <Nav>
                                    <SignupButton />
                                    <LoginButton />
                                    <LogoutButton/>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </ThemeProvider>
            </header>
        );
    }
}