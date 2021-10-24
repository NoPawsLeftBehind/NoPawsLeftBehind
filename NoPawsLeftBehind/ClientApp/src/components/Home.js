import React, { Component } from 'react';
import { Paper, Divider, Button, Stack } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import { Footer } from './Footer.js';
import Pup from "../images/pup-flower.jpg";
import '../style/Home.css';
import { appTheme } from './Theme.js'

export class Home extends Component {
    render() {
        return (
            <ThemeProvider theme={appTheme}>
                <div id="mainDiv">
                    <div className="container">
                        <div className="row">
                            <Paper elevation={3} id="img-paper">
                                <div className="col-xs-12 col-md-6">
                                    {" "}
                                    <img src={Pup} id="pup-img" alt="" />{" "}
                                </div>
                            </Paper>
                            <div className="col-xs-12 col-md-6">
                                <div className="landing-text">
                                    <h2>Save a pet. Be a superhero!</h2>
                                    <Divider />
                                    <p>
                                        Every year, millions of pets remain in shelters while potential owners search unable to find
                                        a perfect pet match. No Paws Left Behind allows shelters to post profiles for pets available for adoption
                                        so that future pet owners can browse and find their perfect pet. Help a pet find their forever home.
                                        Sign up today!
                                    </p>
                                    <Stack>
                                        <Button variant="contained" id="sign-up">Sign Up</Button>
                                        <Button variant="outlined">Login</Button>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </ThemeProvider>
        );
    }
}
