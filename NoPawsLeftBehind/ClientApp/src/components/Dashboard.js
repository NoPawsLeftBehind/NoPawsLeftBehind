import React, { Component } from 'react';
import { Paper, Divider, Stack, Grid, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './Theme.js'
import { withAuth0 } from '@auth0/auth0-react';
import FavoritesList from './FavoritesList';
import DashboardAddPetProfileButton from './DashboardAddPetProfileButton';
import '../style/Dashboard.css';

class Dashboard extends Component {
    render() {
        const { user, isAuthenticated, isLoading, } = this.props.auth0;

        if (isLoading) {
            return <div>Loading ...</div>;
        }

        return (
            isAuthenticated && (
                <ThemeProvider theme={appTheme}>
                    <div id="dashbaoardDiv">
                        <Stack>
                            <h2>My Dashboard</h2>
                            <h3 id="greetingDiv"> Hello {user.nickname}!</h3>
                            <Divider />
                            <Grid container spacing={3} justify="space-evenly" alignItems="left" style={{ flexGrow: 1 }} className="top-bottom-margin">
                                <Grid item xs={12} sm={12} md={6}>
                                    <Paper elevation={3} id="contact-paper" className="top-bottom-margin">
                                        <Box p={2}>
                                            <h2>Account Information</h2>
                                            <Divider />
                                            <h4 className="top-bottom-margin">Contact Information</h4>
                                            <p className="top-bottom-margin">Nickname: {user.nickname}</p>
                                            <p className="top-bottom-margin">Email: {user.email}</p>
                                            <p className="top-bottom-margin">User Id: {user.sub}</p>
                                            <p className="top-bottom-margin">User Role: {user["https://nopawsleftbehind.azurewebsites.net/role"]}</p>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}justify="center" alignItems="center">
                                    <DashboardAddPetProfileButton />
                                    <FavoritesList />
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