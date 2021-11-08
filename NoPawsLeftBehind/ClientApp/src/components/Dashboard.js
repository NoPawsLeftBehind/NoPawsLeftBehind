import React, { Component } from 'react';
import { Paper, Divider, Stack, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import Pup from "../images/pup-flower.jpg";
import '../style/Home.css';
import { appTheme } from './Theme.js'
import HomeLoginButton from './HomeLoginButton.js'
import HomeSignupButton from './HomeSignupButton';
import { withAuth0 } from '@auth0/auth0-react';

class Dashboard extends Component {
    render() {
        const { user, isAuthenticated, isLoading, context } = this.props.auth0;

        if (isLoading) {
            return <div>Loading ...</div>;
        }

        return (
            isAuthenticated && (
                <ThemeProvider theme={appTheme}>
                    <div id="dashbaoardDiv">
                        <Stack>
                            <h2>My Dashboard</h2>
                            <h4>Hello {user.nickname}!</h4>
                            <Divider />
                            <p>User Id: {user.sub}</p>
                            <p>Metadata: </p>
                            <Grid container spacing={3} justify="space-evenly" alignItems="center" style={{ flexGrow: 1 }}>
                                <Grid item xs={12} sm={6} justify="center">
                                    <Paper elevation={3} id="img-paper">
                                        <img src={Pup} id="pup-img" alt="" />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} className="landing-text">
                                    <h2>Save a pet. Be a superhero!</h2>
                                    <Divider />
                                    <p>
                                        Every year, millions of pets remain in shelters while potential owners search unable to find
                                        a perfect pet match. No Paws Left Behind allows shelters to post profiles for pets available for adoption
                                        so that future pet owners can browse and find their perfect pet. Help a pet find their forever home.
                                        Sign up today!
                                    </p>
                                    <Stack>
                                        <HomeSignupButton />
                                        <HomeLoginButton />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </div>

                </ThemeProvider>
            )
        );
    }
}

export default withAuth0(Dashboard);