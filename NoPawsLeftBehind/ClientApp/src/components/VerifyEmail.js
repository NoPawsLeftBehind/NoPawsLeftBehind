import React, { Component } from 'react';
import { Divider, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import '../style/VerifyEmail.css';
import { appTheme } from './Theme.js'

export class VerifyEmail extends Component {
    render() {
        return (
            <ThemeProvider theme={appTheme}>
                <div id="#emailDiv">
                    <Grid container spacing={3} justify="space-evenly" alignItems="center" style={{ flexGrow: 1 }}>
                        <Grid item sm={12} className="email-text">
                            <h2>Verify Email</h2>
                            <Divider />
                            <p>
                                Please verify your email address to access the rest of the site. You should be sent an email shortly.
                            </p>
                        </Grid>
                    </Grid>
                </div>

            </ThemeProvider>
        );
    }
}