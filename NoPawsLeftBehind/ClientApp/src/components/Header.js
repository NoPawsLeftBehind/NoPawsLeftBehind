import React, { Component } from 'react';
import { AppBar, Toolbar, Grid, Typography, Button, createTheme} from '@mui/material'
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Logo from "../images/Logo.png";
import '../style/Header.css';

const appTheme = createTheme ({
    palette: {
        type: 'light',
        primary: {
            main: '#7c4dff',
        },
        secondary: {
            main: '#ff8a65',
        },
    },
});

export class Header extends Component {
    static displayName = Header.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <ThemeProvider theme={appTheme}>
                    <AppBar position="static" className="app-bar">
                        <Toolbar>
                            <Grid container spacing={5}>
                                <Grid item xs={2}>
                                    <Link to="/">
                                        <img src={Logo} className='logo-image' />
                                    </Link>
                                </Grid>
                                <Grid item xs={1}>
                                    <Link to="/">
                                        <Typography variant="h6" component="div" className="path">
                                            Home
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={1}>
                                    <Link to="/counter">
                                        <Typography variant="h6" component="div" className="path">
                                            About
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={2}>
                                    <Link to="/fetch-data">
                                        <Typography variant="h6" component="div" className="path">
                                            Search Pets
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={1}>
                                    <Link to="/counter">
                                        <Typography variant="h6" component="div" className="path">
                                            Contact
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={2}>
                                    <Link to="/fetch-data">
                                        <Typography variant="h6" component="div" className="path">
                                            FAQ
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={3} className="sign-in-buttons">
                                    <Button color="inherit" >Login</Button>
                                    <Button color="inherit" >Sign Up</Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </header>
        );
    }
}