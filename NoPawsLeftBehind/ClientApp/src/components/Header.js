import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import './NavMenu.css';

export class Header extends Component {
    static displayName = Header.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            No Paws Left Behind
                        </Typography>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Sign Up</Button>

                    </Toolbar>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Home
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Search Pets
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Contact
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}